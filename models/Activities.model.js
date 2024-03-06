const { Schema, model } = require("mongoose");

const activitiesSchema = new Shchema({
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
    type: Strings,
    enum: ["Museums", "Outdoor", "Traditions", "Anime"],
  },
  openAllYear: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const Activities = model("Activities", activitiesSchema);

module.exports = Activities;
