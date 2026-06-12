const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema({
  name: String,
  rent: Number,
  location: String,
  facilities: [String],
  contact: String,

  image: {
    type: String,
  },

  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
    },
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  ownerName: {
    type: String,
  },

  ownerPhone: {
    type: String,
  },

  ownerEmail: {
    type: String,
  },
  bookings: [
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
],
});

module.exports = mongoose.model("PG", pgSchema);