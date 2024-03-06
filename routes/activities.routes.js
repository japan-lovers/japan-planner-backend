const router = require("express").Router();

const Activities = require("../models/Activities.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/activities", (req, res) => {
  Activities.find({})
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
    location,
    description,
    category,
    openAllYear,
    startDate,
    endDate,
  } = req.body;

  Activities.create({
    name,
    location,
    description,
    category,
    openAllYear,
    startDate,
    endDate,
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

module.exports = router;
