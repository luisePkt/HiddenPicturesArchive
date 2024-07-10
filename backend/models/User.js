import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

// Schema collectionObjects:
const collectionObjects = new Schema({
  title: {
    type: String,
    require: true,
    default: "image",
  },
  source: {
    type: String,
    require: true,
    default: "unknown",
  },
  keyword: {
    type: String,
  },
  image: {
    type: String,
    require: true,
  },
  public: {
    type: String,
    require: true,
    default: false,
  },
});

// Schema collection:
const collectionSchema = new Schema({
  archiveName: String,
  objects: [collectionObjects],
});

// Schema User:
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    require: [true, "Please provide a password"],
  },
  passwordConfirm: {
    type: String,
    require: [true, "Please confirm your password"],
    validate: {
      // für create & save
      validator: (el) => el === password,
      message: "Passwords are not the same",
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  profileImage: {
    type: String,
    default: "default.png",
  },
  collections: [collectionSchema],
});

const User = model("User", userSchema);
export default User;
