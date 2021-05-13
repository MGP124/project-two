var express = require("express");
var router = express.Router();

const User = require("../models/UserSchema");

// List all food items
router.get("/", async (req, res) => {
  console.log("hello world");
  let data = await User.find({});
  console.info(`records retrieved from mongoose:`, data?.length);
  res.send(data);
});

// List one food item by ID
router.get("/:id", async function (req, res) {
  try {
    const data = await User.findOne({ _id: req.params.id });
    console.info(`Found User:`, data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create one food item from form data
router.post("/", async (req, res) => {
  let userToCreate = req.body;
  try {
    let newUser = new User(userToCreate);
    await newUser.save();
    console.log("Created food item", newUser);
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update one food item by ID
router.put("/:id", async function (req, res) {
  let userToUpdate = req.body;
  try {
    let data = await User.findByIdAndUpdate(req.params.id, userToUpdate);
    console.log("Updated User", data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete one food item by ID

router.delete("/:id", async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);

    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted User", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
