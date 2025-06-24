import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
