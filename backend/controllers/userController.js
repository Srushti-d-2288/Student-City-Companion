const User = require("../models/User");
const PG = require("../models/PG");

exports.toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const pgId = req.params.id;

    if (user.favorites.includes(pgId)) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== pgId
      );
    } else {
      user.favorites.push(pgId);
    }

    await user.save();

    res.json({
      message: "Favorites updated",
      favorites: user.favorites,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getFavorites = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate("favorites");

    res.json(user.favorites);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


exports.getMyBookings = async (req, res) => {
  try {
    console.log("Logged in user:", req.user.id);

    const bookedPGs = await PG.find({
      "bookings.userId": req.user.id,
    });

    console.log("Booked PGs:", bookedPGs);

    res.json(bookedPGs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyPGs = async (req, res) => {
  try {
    const pgs = await PG.find({
      owner: req.user.id,
    });

    res.json(pgs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getDashboard = async (req, res) => {
  try {

    const pgs = await PG.find({
      owner: req.user.id,
    });

    const totalPGs = pgs.length;

    const totalBookings = pgs.reduce(
      (sum, pg) => sum + pg.bookings.length,
      0
    );

    const totalReviews = pgs.reduce(
      (sum, pg) => sum + pg.reviews.length,
      0
    );

    let ratingSum = 0;
    let ratingCount = 0;

    pgs.forEach((pg) => {
      pg.reviews.forEach((review) => {
        ratingSum += review.rating;
        ratingCount++;
      });
    });

    const averageRating =
      ratingCount > 0
        ? (ratingSum / ratingCount).toFixed(1)
        : 0;

    res.json({
      totalPGs,
      totalBookings,
      totalReviews,
      averageRating,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};