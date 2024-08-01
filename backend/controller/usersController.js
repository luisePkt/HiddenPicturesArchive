import User from "../models/UserModel.js";
import { compare, hash } from "../middleware/crypto.js";
import jwt from "jsonwebtoken";

// secretKey:
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Basic Operations:

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

// GET single user
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.status(200).json(user) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// UPDATE single user
export const updateSingleUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    // console.log(user);
    user ? res.status(200).json(user) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// DELETE single user
export const deleteSingleUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Bonus Operations ///////////////////////////////////////////

// login User
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log("username: ", username);

    if (!username || !password) {
      return res.status(400).json({ error: "invalid login" });
    }

    const user = await User.findOne({ username });
    // console.log("userId: ", user._id);

    if (!user) {
      return res.status(401).json({ error: "invalid login" });
    }
    const passwordInput = password;
    const passwordDB = user.password;

    const loginTrue = await compare(passwordInput, passwordDB);
    // const loginTrue = passwordInput === passwordDB; // ohne compare

    console.log("login true: ", loginTrue);

    if (!loginTrue) {
      return res.status(401).json({ error: "invalid login" });
    }

    // sign webtoken:
    if (!accessTokenSecret) {
      return next(error);
    }
    const userId = user._id;
    const accessToken = jwt.sign({ userId }, accessTokenSecret, {
      expiresIn: "1h",
    });
    if (!accessToken) {
      return next(error);
    }

    // cookie mit name "accessToken" wird gesetzt & httpOnly: true verhindert, dass JS auf Client Cookie lesen kann
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: true, // cookie wird nur über HTTPS gesendet
      // sameSite: "strict", // cookie wird nicht bei cross-site requests gesendet
    });

    res.status(200).json({ user: user });

    // alt - ohne cookie:
    // res.json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

// register User
export const registerUser = async (req, res, next) => {
  try {
    // getting user-infos from input:
    const { username, email, password, passwordConfirm } = req.body;
    // console.log("test userdata", req.body);

    const profileImage = req.file?.path; // req.file?.path => optional chaining => wenn req.file undefined oder null wird profileImage als undefined gewertet und kein Fehler ausgegeben => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    // console.log("profileImage: ", profileImage);

    // check infos:
    if (!email || !username || !password || !passwordConfirm) {
      return res.status(400).json({ error: "invalid registration" });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: "invalid registration" });
    }

    // hash password/passwordConfirm:
    const hashed = await hash(password);
    const hashedConfrim = await hash(passwordConfirm);
    // create new user:
    const user = new User({
      username,
      email,
      password: hashed,
      passwordConfirm: hashedConfrim,
      profileImage,
    });
    console.log("user: ", user);
    await user.save();

    // hier vielleicht auch cookie setzten? => user ist ja eingeloggt
    // sign webtoken:
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    if (!accessTokenSecret) {
      return next(error);
    }
    const userId = user._id;
    const accessToken = jwt.sign({ userId }, accessTokenSecret, {
      expiresIn: "1h",
    });
    if (!accessToken) {
      return next(error);
    }

    // // // cookie mit name "accessToken" wird gesetzt & httpOnly: true verhindert, dass JS auf Client Cookie lesen kann
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: true, // cookie wird nur über HTTPS gesendet
      // sameSite: "strict", // cookie wird nicht bei cross-site requests gesendet
    });

    res.status(200).json({ user: user });
    // res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// display profilepicture:
export const displayProfilePic = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Usernot found");
    }
    res.send(user.profileImage);
  } catch (error) {
    next(error);
  }
};

// logout User:
export const logoutUser = (req, res, next) => {
  try {
    // clear cookies:
    res.clearCookie("accessToken");
    res.status(200).json({ user: false });

    console.log("clearcookie");
  } catch (error) {
    next(error);
  }
};
