require("./db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: String, // confirm email
  phoneNumber: Number, // use as phone or text??? preferred contact method - is the phone number optional??
  password: String, // verification, authentication
  confirmPassword: String,
  dateJoined: Date,
  userCommunity: String, // try to use a dropdown???
  itemCommunity: String, // userCommunity is default if no itemCommunity declared
});

module.exports = mongoose.model("User", userSchema);
