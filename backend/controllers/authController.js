const User = require("/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new student
const registerUser = async (req, res) => {
  try {
    const { fullName, email, enrollment, password } = req.body;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !enrollment?.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Please fill in all the fields.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedEnrollment = enrollment.trim();

    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { enrollment: normalizedEnrollment },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.email === normalizedEmail
            ? "An account with this email already exists."
            : "This enrollment number is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      enrollment: normalizedEnrollment,
      password: hashedPassword,
      role: "student",
    });

    return res.status(201).json({
      message: "Registration successful. Please log in.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        enrollment: user.enrollment,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email or enrollment number is already registered.",
      });
    }

    console.error("Registration error:", error.message);
    return res.status(500).json({
      message: "Unable to register right now. Please try again.",
    });
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message: "Please enter your email and password.",
      });
    }

    if (!["student", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Please select a valid account type.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    // Use the same response for unknown emails and incorrect passwords.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: `This account does not have ${role} access.`,
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured.");
      return res.status(500).json({
        message: "Authentication is not configured on the server.",
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        enrollment: user.enrollment,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Unable to log in right now. Please try again.",
    });
  }
};

module.exports = { registerUser, loginUser };