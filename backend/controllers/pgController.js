const PG = require("../models/PG");




// ✅ ADD PG
exports.addPG = async (req, res) => {
  try {

    console.log(req.body);

    const pg = await PG.create({
      ...req.body,

      facilities: req.body.facilities.split(","),

      image: req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : "",

      owner: req.user.id,
    });

    res.status(201).json({
      message: "PG added successfully",
      pg,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ✅ GET ALL PGs
exports.getAllPGs = async (req, res) => {
  try {
    const pgs = await PG.find();

    res.json(pgs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ✅ GET SINGLE PG
exports.getPGById = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        message: "PG not found",
      });
    }

    res.json(pg);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePG = async (req, res) => {
  try {

    const updatedPG = await PG.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "PG updated successfully",
      updatedPG,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.deletePG = async (req, res) => {
  try {
    await PG.findByIdAndDelete(req.params.id);

    res.json({
      message: "PG deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.addReview = async (req, res) => {
  try {

    const { user, comment, rating } = req.body;

    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        message: "PG not found",
      });
    }

    pg.reviews.push({
      user,
      comment,
      rating,
    });

    await pg.save();

    res.json({
      message: "Review added successfully",
      pg,
    });

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

exports.bookPG = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        message: "PG not found",
      });
    }

    pg.bookings.push({
      userId: req.user.id,
    });

    await pg.save();

    res.json({
      message: "Booking successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

