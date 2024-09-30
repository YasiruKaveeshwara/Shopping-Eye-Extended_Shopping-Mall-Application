const mongoose = require('mongoose');
const BodyType = require('../models/BodyType');
const cloudinary = require('../config/cloudinary');

// Create a new body type
exports.addBodyType = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file;  // Get the uploaded image
        
        // Upload image to Cloudinary and get URL
        let imageUrl = '';
        if (image) {
        const result = await cloudinary.uploader.upload(image.path);
        imageUrl = result.secure_url;
        }

        const newBodyType = new BodyType({ name, description, imageUrl });
        await newBodyType.save();
        res.status(201).json({ message: "Body Type added successfully", BodyType: newBodyType });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all body types
exports.getAllBodyTypes = async (req, res) => {
    try {
        const bodyTypes = await BodyType.find();
        res.status(200).json(bodyTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a single body type by ID
exports.getBodyType = async (req, res) => {
    try {
        const bodyType = await BodyType.findById(req.params.id);
        if (!bodyType) return res.status(404).json({ message: 'Body type not found' });
        res.status(200).json(bodyType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a body type by ID
exports.updateBodyType = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file;  // Get the uploaded image
        
        // Find the existing body type
        const bodyType = await BodyType.findById(req.params.id);
        if (!bodyType) {
            return res.status(404).json({ message: 'Body type not found' });
        }

        // Upload new image to Cloudinary if provided
        let imageUrl = bodyType.imageUrl;  // Retain the old image URL
        if (image) {
            const result = await cloudinary.uploader.upload(image.path);
            imageUrl = result.secure_url;  // Use the new uploaded image URL
        }

        // Update the body type fields
        bodyType.name = name || bodyType.name;
        bodyType.description = description || bodyType.description;
        bodyType.imageUrl = imageUrl;

        // Save the updated body type
        await bodyType.save();

        res.status(200).json({
            message: 'Body Type updated successfully',
            BodyType: bodyType,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




// Delete a body type by ID
exports.deleteBodyType = async (req, res) => {
    try {
        const deletedBodyType = await BodyType.findByIdAndDelete(req.params.id);
        if (!deletedBodyType) return res.status(404).json({ message: 'Body type not found' });
        res.status(200).json({ message: 'Body type deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
