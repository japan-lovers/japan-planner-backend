const router = require("express").Router();

const User = require("../models/User.model");

router.get("/:userId", (req, res) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve user" });
    });
});

module.exports = router;
