const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const itemController = require('../controllers/itemController');
const feedbackController = require('../controllers/feedbackController');
const measurementController = require('../controllers/measurementController');
const bodyTypeController = require('../controllers/bodyTypeController');
const ShopModel = require('../models/Shop.js');
const ItemModel = require('../models/Item.js');
// const Measurement = require('../models/Measurement.js');
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



router.post('/feedback/:shopId', feedbackController.addFeedback);

// Route to get feedback for a specific shop
router.get('/feedback/:shopId', feedbackController.getFeedbackByShop);

// Route to get all feedback (for an admin page if needed)
router.get('/feedback', feedbackController.getAllFeedback);




// Routes for Measurements
router.post('/measurements/saveMeasurements', measurementController.saveMeasurements);
router.get('/measurements', measurementController.getAllMeasurements);
router.put('/measurements/updateMyMeasurements/:id', measurementController.updateMeasurements);
router.delete('/measurements/deleteMyMeasurements/:id', measurementController.deleteMeasurements);
router.get('/measurements/getUserMeasurements/:id', measurementController.getUserMeasurements);


// Routes for Body Types
router.post('/bodyTypes/addBodyType', upload.single('image'), bodyTypeController.addBodyType);
// router.post('/bodyTypes/addBodyType', bodyTypeController.addBodyType);
router.get('/bodyTypes/getAllBodyTypes', bodyTypeController.getAllBodyTypes);
// router.put('/bodyTypes/updateBodyType/:id', bodyTypeController.updateBodyType);
router.put('/bodyTypes/updateBodyType/:id', upload.single('image'), bodyTypeController.updateBodyType);
router.delete('/bodyTypes/deleteBodyType/:id', bodyTypeController.deleteBodyType);
router.get('/bodyTypes/getBodyType/:id', bodyTypeController.getBodyType);



module.exports = router;