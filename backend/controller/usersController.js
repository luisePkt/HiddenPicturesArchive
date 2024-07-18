import User from "../models/UserModel.js";
import { compare, hash } from "../middleware/crypto.js";
// import multer from "multer";
import jwt from "jsonwebtoken";

// secretKey:
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

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

/////////////////////////////////////////////
// login User
export const loginUser = async (req, res, next) => {
  try {
    console.log("test login");
    const { username, password } = req.body;
    console.log("username: ", username);
    console.log(req.body);

    if (!username || !password) {
      return res.status(400).json({ error: "invalid login" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "invalid login" });
    }
    const passwordInput = password;
    const passwordDB = user.password;
    // console.log("pwInp: ", passwordInput);
    // console.log("pwDB: ", passwordDB);

    const loginTrue = await compare(passwordInput, passwordDB);
    // const loginTrue = passwordInput === passwordDB;

    console.log("login true: ", loginTrue);

    if (!loginTrue) {
      return res.status(401).json({ error: "invalid login" });
    }

    // sign webtoken:
    if (!accessTokenSecret) {
      return next(error);
    }
    // const accessToken = jwt.sign({ username, password }, accessTokenSecret);
    const accessToken = jwt.sign({ username }, accessTokenSecret);
    if (!accessToken) {
      return next(error);
    }

    // cookie mit Name "accessToken" wird gesetzt & httpOnly: true verhindert, dass JS auf Client Cookie lesen kann
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: "strict",
    });

    res.status(200).json({ user: user });
    // console.log("accessToken: ", accessToken);
    // ende sign webtoken

    // alt, funktioniert:
    // res.json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

// register User

export const registerUser = async (req, res, next) => {
  try {
    console.log("test")
    const { username, email, password, passwordConfirm } = req.body;
    // console.log("test file", req.file);
    console.log("test userdata", req.body);

    const profileImage = req.file?.path; // req.file?.path => optional chaining => wenn req.file undefined oder null wird profileImage als undefined gewertet und kein Fehler ausgegeben => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    console.log("test");
    console.log("profileImage: ", profileImage);

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
    res.clearCookie("accessToken");
    res.status(200).json({ user: false });

    console.log("clearcookie");
  } catch (error) {
    next(error);
  }
};
