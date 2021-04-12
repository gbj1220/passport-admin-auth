const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../users/model/User");

const signUp = async (req, res) => {
  try {
    const genSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, genSalt);

    const createdAdmin = new Admin({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    const saveCreatedAdmin = await createdAdmin.save();

    res.json({
      message: "Admin Created!",
      admin: saveCreatedAdmin,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const logIn = async (req, res) => {
  try {
    const foundAdmin = await Admin.findOne({ email: req.body.email });

    if (!foundAdmin) {
      throw { Message: "Admin not found. Please go sign up!" };
    }

    const comparedPassword = await bcrypt.compare(
      req.body.password,
      foundAdmin.password
    );

    if (!comparedPassword) {
      throw {
        Message: "Please check that your email and password are correct!",
      };
    }
    const jwtToken = jwt.sign(
      {
        email: foundAdmin.email,
        username: foundAdmin.userName,
      },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "1d",
      }
    );
    console.log("=== Successful Admin Login ===");
    res.json({
      jwtToken,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    let updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { new: true }
    );

    res.json({
      message: "Update Admin success!!",
      admin: updatedUser,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getAllUsersProfile = async (req, res) => {
  try {
    let allUsersProfile = await User.find({});

    res.json({
      message: "Got all users",
      users: allUsersProfile,
    });
  } catch {
    res.status(500).json({
      message: e.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let foundUser = await User.findOneAndDelete({ email: req.body.email });

    res.json({
      message: "Successfully Deleted",
      user: foundUser,
    });
  } catch (e) {
    message: e.message;
  }
};

module.exports = {
  signUp,
  logIn,
  updateUserProfile,
  getAllUsersProfile,
  deleteUser,
};
