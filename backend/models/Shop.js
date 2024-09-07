const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  // shopName: {
  //   type: String,
  //   required: true
  // },
  // category: {
  //   type: String,
  //   required: true
  // },
  // location: {
  //   type: String,
  //   required: true
  // }
  shopName: { type: String, required: true },
  ownerName: { type: String, required: true },
  shopCategory: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  shopLogo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }

  // Add other fields as necessary
});

const Shop = mongoose.model(
  "Shop",
  shopSchema
  // "shopsSample"
);

module.exports = Shop;
