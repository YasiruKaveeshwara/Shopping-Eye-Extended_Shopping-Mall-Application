const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  shopName: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  shopLocation: { type: String, required: true },
  itemLocation: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String }
});

const Item = mongoose.model(
  "Item",
  itemSchema
  //  "itemsSample"
);

module.exports = Item;
