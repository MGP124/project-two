require("./db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: String,
  itemSize: String,
  itemQuantity: Number,
  expiryDate: Date,
  postedDate: Date,
  description: String,
  category: String,
});

module.exports = mongoose.model("Item", itemSchema);
