const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    // Verify token
    const decoded = jwt.verify(token, "secretKey");

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;