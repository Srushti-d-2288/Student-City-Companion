
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  toggleFavorite,
  getFavorites,
  getMyBookings,
  getDashboard,
} = require("../controllers/userController");

router.put(
  "/favorite/:id",
  authMiddleware,
  toggleFavorite
);

router.get(
  "/favorites",
  authMiddleware,
  getFavorites
);

router.get(
  "/bookings",
  authMiddleware,
  getMyBookings
);

router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);

module.exports = router;