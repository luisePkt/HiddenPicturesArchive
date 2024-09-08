import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// secret token:
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const tokenAuth = async (req, res, next) => {
  try {
    // console.log("test");
    // get token from cookie
    const token = req.cookies.accessToken;
    // console.log({ token });

    if (!token) {
      return res.sendStatus(401);
    }

    if (!accessTokenSecret) {
      return res.sendStatus(500);
    }
    // validate token
    const verification = jwt.verify(
      token,
      accessTokenSecret,
      async (error, payload) => {
        // payload -> object with userinfo
        if (error) {
          return res.sendStatus(403);
        } else {
          return payload;
        }
      }
    );

    if (!verification) {
      return res.status(400).json({ error: "verifivation failed" });
    }

    // payload wird zu req.user hinzugefügt
    req.user = verification;
    next();

    // find user in db with username
    // const user = await User.findOne({ username: payload.username });
    // if (!user) {
    //   return res.sendStatus(404);
    // }
    // zuweisung wichtig, um z.B. später zu prüfen, ob user für best. Bereiche berechtigt ist
    // req.user = user;
    //     next();
    //   }
    // );
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
