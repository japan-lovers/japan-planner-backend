const router = require("express").Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/:userId", isAuthenticated, (req, res) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve user" });
    });
});

router.put("/:userId", isAuthenticated, (req, res) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to update user" });
    });
});

module.exports = router;
