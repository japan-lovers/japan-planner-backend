const { Schema, model } = require("mongoose");

const activitiesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "Museum",
      "Outdoor",
      "Traditional",
      "Anime",
      "Observation deck",
      "Sports",
      "Theme park",
      "Festival",
    ],
  },
  openAllYear: {
    type: Boolean,
    default: false,
  },
  bestSeason: {
    type: String,
    enum: ["Winter", "Spring", "Summer", "Fall", "All Seasons"],
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
  },
  free: {
    type: Boolean,
  },
});

const Activities = model("Activities", activitiesSchema);

module.exports = Activities;
