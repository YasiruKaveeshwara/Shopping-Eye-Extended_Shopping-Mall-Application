const express = require("express");
const router = express.Router();
const Item = require("../models/Item"); // Adjust based on your item model

// Search endpoint
router.get("/search", async (req, res) => {
  // Added leading slash
  const { query } = req.query;

  try {
    const results = await Item.find({
      $or: [
        { shopName: { $regex: query, $options: "i" } },
        { productName: { $regex: query, $options: "i" } },
        { shopLocation: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
