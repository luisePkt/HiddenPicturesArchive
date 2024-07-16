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
    keywords: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
      require: true,
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true,
      },
    ],
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
