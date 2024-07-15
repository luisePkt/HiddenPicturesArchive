import User from "../models/User.js";
import { compare, hash } from "../middleware/crypto.js";
import multer from "multer";

// CREAT new user
export const createUser = async (req, res, next) => {
  try {
    await User.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

// GET all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET user
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.status(200).json(user) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// UPDATE user
export const updateSingleUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    user ? res.status(200).json(user) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// DELETE user

export const deleteSingleUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {}
};

/////////////////////////////////////////////
// login User
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log("username: ", username);

    if (!username || !password) {
      return res.status(400).json({ error: "invalid login" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "invalid login" });
    }

    const passwordInput = password;
    const passwordDB = user.password;

    const loginTrue = await compare(passwordInput, passwordDB);

    console.log("login true: ", loginTrue);

    if (!loginTrue) {
      return res.status(401).json({ error: "invalid login" });
    }
    res.json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

// register User

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;
    console.log("test", req.file);
    const profileImage = req.file.path;
    console.log("profileImage: ", profileImage);

    // const profileImage = `/public/img/users/${req.file.filename}`;

    if (!email || !username || !password || !passwordConfirm) {
      return res.status(400).json({ error: "invalid registration" });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: "invalid registration" });
    }

    const hashed = await hash(password);
    const hashedConfrim = await hash(passwordConfirm);
    const user = new User({
      username,
      email,
      password: hashed,
      passwordConfirm: hashedConfrim,
      profileImage,
    });
    console.log("user: ", user);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
