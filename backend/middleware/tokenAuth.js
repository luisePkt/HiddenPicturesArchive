import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// secret token:
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const tokenAuth = (req, res, next) => {
  try {
    console.log("test");
    // get token
    const token = req.cookies.accessToken;

    console.log({ token });

    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, accessTokenSecret);
  } catch (error) {
    next(error);
  }
};

export default tokenAuth;

// alt:
// export const tokenAuth = (req, res, next) => {
//   try {
//     // get authorization header with bearer.token
//     const authorization = req.headers["accessToken"];
//     console.log("Authorization Header:", req.headers["authorization"]);

//     console.log("req.headers: ", req.headers);

//     // console.log({ authorization });

//     // get token
//     const token = authorization.split(" ")[1];
//     // const token = authorization;
//     console.log({ token });
//     console.log("test");

//     if (token == null) {
//       return res.sendStatus(401);
//     }
//     jwt.verify(authorization, accessTokenSecret, async (error, payload) => {
//       // jwt.verify(token, accessTokenSecret, async (error, payload) => {
//       if (error) {
//         console.log("error: ", error);
//         res.sendStatus(403);
//         return next(error);
//       }
//       const user = await User.findOne({ username: payload.username });
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     next(error);
//   }
// };
