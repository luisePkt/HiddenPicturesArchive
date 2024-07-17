import mongoose, { model } from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

// Schema collectionObjects:
// const collectionObjects = new Schema({
//   title: {
//     type: String,
//     require: true,
//     default: "image",
//   },
//   source: {
//     type: String,
//     require: true,
//     default: "unknown",
//   },
//   keyword: {
//     type: String,
//   },
//   image: {
//     type: String,
//     require: true,
//   },
//   public: {
//     type: String,
//     require: true,
//     default: false,
//   },
// });

// // Schema collection:
// const collectionSchema = new Schema({
//   archiveName: String,
//   objects: [collectionObjects],
// });

// Schema User:
const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: function (v) {
          const trimmed = v.trim();
          return validator.matches(trimmed, /^[a-zA-Z0-9_]+$/);
        },
        message: (props) => "This is not a valid Username",
      },
    },
    password: {
      type: String,
      minlength: 8,
      require: [true, "Please provide a password"],
      validate: {
        validator: function (v) {
          const trimmed = v.trim();
          return trimmed.length > 12;
        },
        message: (props) => "Not a valid password!",
      },
    },
    passwordConfirm: {
      type: String,
      require: [true, "Please confirm your password"],
      validate: {
        validator: function (v) {
          const trimmed = v.trim();
          return trimmed.length > 12;
        },
        message: (props) => "Not a valid password!",
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: function (v) {
          const trimmed = v.trim();
          return validator.isEmail(trimmed);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    profileImage: {
      type: String,
      default: "default.png",
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true,
      },
    ],
  },
  { versionKey: false }
);

const User = model("User", userSchema);
export default User;
