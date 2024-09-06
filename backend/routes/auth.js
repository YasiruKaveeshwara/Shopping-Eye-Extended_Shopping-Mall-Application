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
// get 1 shop
router.get('/getShops', async (req, res) => {
  const { email } = req.query;
  try {
    const shop = await ShopModel.findOne({ email });
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving shop', error });
  }
});

// Get Single shop by ID
router.get('/shops/:id', authController.getShopById);

// Update shop by ID
router.put('/shops/:id', upload.single('shopLogo'), authController.updateShopById);




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