import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); //encrypt pw
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created successfully!!");
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    // Since passwords are hashed, we need to compare the hashed password with the provided password by bcryptjscompareSync
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    //authenticate user.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...restInfo } = validUser._doc; // Exclude password from the response
    // save token as cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(restInfo); // Send the user info without the password
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (req.body.photo && user.avatar !== req.body.photo) {
        user.avatar = req.body.photo;
        await user.save();
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...restInfo } = user._doc; // Exclude password from the response
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restInfo); // Send the user info without the password
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // Generate a random password
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10); // Encrypt the password
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4), // Generate a random username
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...restInfo } = newUser._doc; // Exclude password from the response
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restInfo); // Send the user info without the password
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
