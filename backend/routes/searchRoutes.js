// routes/searchRoutes.js
const express = require("express");
const Shop = require("../models/Shop"); // Ensure this points to shopsSample model
const Item = require("../models/Item"); // Ensure this points to itemsSample model

const router = express.Router();

router.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query || "";

    // Perform a case-insensitive search for shops and items
    const shops = await Shop.find({ shopName: new RegExp(query, "i") });
    const items = await Item.find({
      $or: [
        { name: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
        { categories: { $in: [new RegExp(query, "i")] } }
      ]
    });

    res.json({ shops, items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching search results" });
  }
});

module.exports = router;
