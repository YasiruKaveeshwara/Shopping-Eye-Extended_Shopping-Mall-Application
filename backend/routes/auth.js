const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const itemController = require('../controllers/itemController'); // Assuming you have created the itemController as provided earlier
const ShopModel = require('../models/Shop.js');
const ItemModel = require('../models/Item.js');
const upload = require('../config/multer');

// Signup route
router.post('/signup', upload.single('shopLogo'), authController.signup);

// Login route
router.post('/login', authController.login);

// GET all shops
router.get('/getShops', (req, res) => {
    ShopModel.find()
      .then(shops => res.json(shops))
      .catch(err => res.status(500).json({ message: 'Error retrieving shops', error: err }));
  });
// Get Single shop by ID
router.get('/shops/:id', authController.getShopById);

// Update shop by ID
router.put('/shops/:id', upload.single('image'), authController.updateShopById);




// Add Item
router.post('/items/add', upload.single('image'), itemController.addItem);

// Get All Items
router.get('/items', itemController.getAllItems);

// Get Single Item by ID
router.get('/items/:id', itemController.getItemById);

// Update Item by ID
router.put('/items/:id', upload.single('image'), itemController.updateItemById);

// Delete Item by ID
router.delete('/items/:id', itemController.deleteItemById);



module.exports = router;