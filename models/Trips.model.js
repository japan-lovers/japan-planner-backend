const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tripsSchema = new Schema(
  {
    name: {
      type: String,
      default: "My trip to Japan",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    destinations: {
      type: [String],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    activities: [
      {
        activity: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Activities",
        },
        date: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Trips = model("Trips", tripsSchema);

module.exports = Trips;
