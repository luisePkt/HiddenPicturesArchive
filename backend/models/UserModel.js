import mongoose, { model } from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

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
        message: (props) => `${props.value} is not a valid username!`,
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
        message: (props) => `${props.value} is not a valid password!`,
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
        message: (props) => `${props.value} is not a valid password!`,
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
      publicId: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
      // type: String,
      // default: "default.png",
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
