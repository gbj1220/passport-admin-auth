const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      jwtToken,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    res.json({
      message: "Update Admin success!!",
      admin: req.admin,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  signUp,
  logIn,
  updateProfile,
};
