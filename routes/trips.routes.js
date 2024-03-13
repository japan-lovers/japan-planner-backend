const router = require('express').Router();
const mongoose = require('mongoose');

const Trips = require('../models/Trips.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/trips', (req, res) => {
  Trips.find({})
    .populate('activities.activity')
    .then((trips) => {
      res.json(trips);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve trips' });
    });
});

router.post('/trips', isAuthenticated, (req, res) => {
  const { userId, destinations, startDate, endDate } = req.body;

  Trips.create({ userId, destinations, startDate, endDate })
    .then((newTrip) => {
      res.json(newTrip);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Failed to create new trip' });
    });
});

router.get('/trips/:tripId', (req, res) => {
  Trips.findById({ _id: req.params.tripId })
    .populate('activities.activity')
    .then((tripById) => {
      res.json(tripById);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve trip by id' });
    });
});

router.put('/trips/:tripId', isAuthenticated, (req, res) => {
  const { tripId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Trips.findByIdAndUpdate(tripId, req.body, { new: true })
    .then((updatedTrip) => res.json(updatedTrip))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Failed to update trip' });
    });
});

router.delete('/trips/:tripId', isAuthenticated, (req, res) => {
  const { tripId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Trips.findByIdAndDelete(tripId)
    .then(() => res.status(204).send())
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete trip' });
    });
});

router.get('/trips/user/:userId', (req, res) => {
  const { userId } = req.params;

  Trips.find({ userId })
    .then((userTrips) => res.json(userTrips))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve user trips' });
    });
});

module.exports = router;
