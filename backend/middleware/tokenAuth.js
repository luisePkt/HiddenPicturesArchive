import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const tokenAuth = (req, res, next) => {
  try {
    // login frontend:
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];

    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, accessTokenSecret, async (error, payload) => {
      if (error) {
        console.log("error: ", error);
        res.sendStatus(403);
        return next(error);
      }
      const user = await User.findOne({ username: payload.username });
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default tokenAuth;
