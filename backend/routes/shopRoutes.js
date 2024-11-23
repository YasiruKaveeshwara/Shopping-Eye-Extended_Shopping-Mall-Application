const express = require("express");
const Shop = require("../models/Shop");

const router = express.Router();

// GET all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find({});
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops" });
  }
});

// GET a shop by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shop" });
  }
});

// GET shops by location (Update this route)
router.get("/location/:location", async (req, res) => {
  try {
    const { location } = req.params;
    const shops = await Shop.find({ location });
    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found at this location" });
    }
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops by location" });
  }
});

module.exports = router;
