const { Schema, model } = require("mongoose");

const activitiesSchema = new Schema(
  {
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
        "Observation deck",
        "Sports",
        "Theme park",
        "Anime",
        "Music",
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
    geometry: {
      type: Object,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Activities = model("Activities", activitiesSchema);

module.exports = Activities;
