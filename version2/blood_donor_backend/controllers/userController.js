const user = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { generateToken } = require('../lib/utils.js');
const connectDb = require('../lib/db.js');

const jwt = require('jsonwebtoken');//token check(done in oder to make login and logout based decisions)

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.checkAuth = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ authenticated: true, userId: decoded.userId });
  } catch {
    res.status(401).json({ authenticated: false });
  }
};
exports.signup = async (req, res) => {
  await connectDb();
  try {
    const { name, email, password, category } = req.body;
    if (!name || !email || !password || !category) {
      return res.status(400).json({ message: "All fields are mandatory!" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Not a valid Email!" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password Needs to be Strong!" })
    }

    const isEmail = await user.findOne({ email: email });

    if (isEmail) {
      return res.status(400).json({ message: "Email Already exists" })
    }
    const newpw = await bcrypt.hash(password, 10);

    const newuser = await user.create({ name, email, password: newpw, category });

    generateToken(res, newuser._id);

    return res.status(200).json({ message: "Signed Up succesfully!" });
  } catch (error) {
    console.log("Error in signup")
    console.log(error);
  }
}

exports.login = async (req, res) => {
  await connectDb();
  try {
    const { email, password,category } = req.body;
    if (!email || !password || !category) {
      return res.status(400).json({ message: "All fields are mandatory!" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Not a valid Email!" });
    }


    const findedUser = await user.findOne({ email: email ,category: category});
    if (!findedUser) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    const verify = await bcrypt.compare(password, findedUser.password);

    if (!verify) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    generateToken(res, findedUser._id);

    return res.status(200).json({ message: "Logged In succesfully" }, { email })
  } catch (error) {
    console.log("Error in login")
    console.log(error);
  }
}
exports.provideInfo = async (req, res) => {
  await connectDb();

  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const findedUser = await user
      .findById(decoded.userId)
      .select("name email category");

    if (!findedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      name: findedUser.name,
      email: findedUser.email,
      category: findedUser.category,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};