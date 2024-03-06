const { Schema, model } = require("mongoose");

const activitiesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    enum: ["Museums", "Outdoor", "Traditions", "Anime", "Observation deck"],
  },
  openAllYear: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
});

const Activities = model("Activities", activitiesSchema);

module.exports = Activities;
