const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const genSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, genSalt);

    const createdUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    const saveCreatedUser = await createdUser.save();

    res.json({
      message: "User created",
      user: saveCreatedUser,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const logIn = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (!foundUser) {
      throw { Message: "User not found! Please go sign up!" };
    }

    const comparedPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!comparedPassword) {
      throw {
        Message: "Please check that your email and password are correct!",
      };
    }

    const jwtToken = jwt.sign(
      {
        email: foundUser.email,
        username: foundUser.userName,
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
    console.log("-------------");
    console.log(req.session.passport);
    console.log("-------------");
    res.json({
      message: "Update route success!",
      user: req.user,
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
