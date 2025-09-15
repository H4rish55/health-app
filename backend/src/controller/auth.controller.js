const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const generateTokenAndSetCookie = require("../utils/genAuthToken");
const genVerificationCode = require("../utils/genVerificationCode");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetSuccessEmail,
} = require("../mail/email");

const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 7) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 7 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    if (role !== "doctor" && role !== "user") {
      return res.status(400).json({ success: false, message: "Invalid roles" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const verificationToken = genVerificationCode();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.save();

    sendWelcomeEmail(user.email, user.username);

    res.status(200).json({
      success: true,
      message: "Email verification successfull",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (role !== "doctor" && role !== "user") {
      return res.status(400).json({ success: false, message: "Invalid roles" });
    }

    if (user.role !== role) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role for this account" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-health");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendResetPasswordEmail(
      user.email,
      `http://localhost:5173/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgot password controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    if (password.length < 7) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 7 characters",
      });
    }

    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successfull" });
  } catch (error) {
    console.log("Error in reset password controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      res.status(400).json({ success: false, message: "User Not Found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in auth check controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
