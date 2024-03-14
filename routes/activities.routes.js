const router = require("express").Router();

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
