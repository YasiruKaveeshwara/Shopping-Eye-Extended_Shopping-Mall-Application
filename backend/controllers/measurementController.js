const mongoose = require('mongoose'); // Add this line
const Measurement = require("../models/Measurement.js");
const { determineBodyType } = require("../util/bodyTypeHelper"); // Import helper

// Save new measurements
exports.saveMeasurements = async (req, res) => {
    try {
        const { bust, waist, hip } = req.body;

        // Determine body type
        const bodyType = determineBodyType({ bust, waist, hip });

        const newMeasurement = new Measurement({
            bust,
            waist,
            hip,
            bodyType
        });

        await newMeasurement.save();
        res.json("Measurements Saved");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Server error", error: err.message });
    }
};

// Get all measurements
exports.getAllMeasurements = async (req, res) => {
    try {
        const measurements = await Measurement.find();
        res.json(measurements);
    } catch (err) {
        console.error("Get Measurements error:", err.message);
        res.status(500).send({ status: "Server error when Saving Measurements", error: err.message });
    }
};




// Update measurements by ID
exports.updateMeasurements = async (req, res) => {
    try {
        const myMeasurementId = req.params.id;
        const { bust, waist, hip } = req.body;

        // Determine body type
        const bodyType = determineBodyType({ bust, waist, hip });

        const measurementsData = { bust, waist, hip, bodyType };
        const updated = await Measurement.findByIdAndUpdate(myMeasurementId, measurementsData, { new: true });

        if (!updated) {
            return res.status(404).send({ status: "Measurement not found" });
        }

        res.status(200).send({ status: "Your Measurements Updated", measurements: updated });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Server error when Updating", error: err.message });
    }
};

// Delete measurements by ID
exports.deleteMeasurements = async (req, res) => {
    try {
        const myMeasurementId = req.params.id;
        const deleted = await Measurement.findByIdAndDelete(myMeasurementId);

        if (!deleted) {
            return res.status(404).send({ status: "Measurement not found" });
        }

        res.status(200).send({ status: "Your Measurements Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error in deleting Your Measurements", error: err.message });
    }
};

// Get single measurement by ID
exports.getUserMeasurements = async (req, res) => {
    try {
        const myMeasurementsId = req.params.id;
        const userMeasurements = await Measurement.findById(myMeasurementsId);

        if (!userMeasurements) {
            return res.status(404).send({ status: "User Measurements not found" });
        }

        res.status(200).send({ status: "User Measurements Fetched", userMeasurements });
    } catch (error) {
        console.error("Error fetching User Measurements:", error.message);
        res.status(500).send({ status: "Error with get User Measurements", error: error.message });
    }
};
