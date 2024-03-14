const router = require("express").Router();
const mongoose = require("mongoose");

const Activities = require("../models/Activities.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/activities", (req, res) => {
  Activities.find()
    .sort({ createdAt: -1 })
    .then((activities) => {
      res.json(activities);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve activities" });
    });
});

router.post("/activities", isAuthenticated, (req, res) => {
  const {
    name,
    address,
    location,
    description,
    category,
    openAllYear,
    startDate,
    endDate,
    image,
    free,
    geometry,
  } = req.body;

  Activities.create({
    name,
    address,
    location,
    description,
    category,
    openAllYear,
    startDate,
    endDate,
    image,
    free,
    geometry,
  })
    .then((newActivity) => {
      res.json(newActivity);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create new activity" });
    });
});

router.get("/activities/:activityId", (req, res) => {
  Activities.findById({ _id: req.params.activityId })
    .then((activityById) => {
      res.json(activityById);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve activity by id" });
    });
});

router.put("/activities/:activityId", (req, res) => {
  const { activityId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Activities.findByIdAndUpdate(activityId, req.body, { new: true })
    .then((updatedActivity) => {
      res.json(updatedActivity);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve activity by id" });
    });
});

router.get("/categories", async (req, res) => {
  try {
    const enumValues = Activities.schema.path("category").enumValues;
    res.status(200).json(enumValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
});

module.exports = router;
