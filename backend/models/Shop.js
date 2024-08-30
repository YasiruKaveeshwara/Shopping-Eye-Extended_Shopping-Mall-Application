const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }

  // Add other fields as necessary
});

const Shop = mongoose.model("Shop", shopSchema, "shopsSample");

module.exports = Shop;
