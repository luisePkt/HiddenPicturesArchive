import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
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
  },
  { versionKey: false }
);

const Image = model("Image", imageSchema);
export default Image;
