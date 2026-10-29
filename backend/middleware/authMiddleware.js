const jwt = require("jsonwebtoken");
const User = require("/models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Please log in to continue.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Authentication is not configured.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select(
      "_id fullName email enrollment role"
    );

    if (!user) {
      return res.status(401).json({
        message: "User account not found. Please log in again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Your session is invalid or expired. Please log in again.",
    });
  }
};

module.exports = { protect };