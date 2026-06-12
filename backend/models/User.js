const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "landlord"]
  },
  favorites: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PG",
  },
]
});

module.exports = mongoose.model("User", userSchema);