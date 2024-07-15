import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const collectionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    name: { type: String, require: true },
    description: {
      type: String,
    },
  },
  { versionKey: false }
);

const Collection = model("Collection", collectionSchema);

export default Collection;
