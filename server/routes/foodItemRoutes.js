var express = require("express");
var router = express.Router();

const FoodItem = require("../models/ItemSchema");

// List all food items
router.get("/", async (req, res) => {
  console.log("hello world");
  let data = await FoodItem.find({});
  console.info(`records retrieved from mongoose:`, data?.length);
  res.send(data);
});

// List one food item by ID
router.get("/:id", async function (req, res) {
  try {
    const data = await FoodItem.findOne({ _id: req.params.id });
    console.info(`Found Food Item:`, data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create one food item from form data
router.post("/", async (req, res) => {
  let foodItemToCreate = req.body;
  try {
    let newFoodItem = new FoodItem(foodItemToCreate);
    await newFoodItem.save();
    console.log("Created food item", newFoodItem);
    res.send(newFoodItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update one food item by ID
router.put("/:id", async function (req, res) {
  let foodItemToUpdate = req.body;
  try {
    let data = await FoodItem.findByIdAndUpdate(
      req.params.id,
      foodItemToUpdate
    );
    console.log("Updated Food Item", data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete one food item by ID

router.delete("/:id", async (req, res) => {
  try {
    const data = await FoodItem.findByIdAndDelete(req.params.id);

    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted Food Item", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
