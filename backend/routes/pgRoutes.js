const express = require("express");

const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  addPG,
  getAllPGs,
  getPGById,
  updatePG,
  deletePG,
  addReview,
  getMyPGs,
  bookPG,
} = require("../controllers/pgController");

const authMiddleware = require("../middleware/authMiddleware");

// router.post("/add", authMiddleware, addPG);

router.get("/all", getAllPGs);

router.get("/:id", getPGById); 

router.put("/update/:id", authMiddleware, updatePG);

router.delete("/delete/:id", authMiddleware, deletePG);
router.post( "/add",authMiddleware,upload.single("image"), addPG);
router.post("/review/:id", addReview);
router.get("/mypgs", authMiddleware, getMyPGs);
router.put("/book/:id",authMiddleware,bookPG);
router.get("/my-pgs",authMiddleware,getMyPGs);

module.exports = router;