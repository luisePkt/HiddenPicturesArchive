import mongoose from "mongoose";

export default function connect() {
  mongoose.connection.on("connected", () => console.log("DB connected"));
  mongoose.connection.on("error", (error) => console.log("DB error: ", error));

  const url = process.env.MONGODB_CONNECTION_STRING;
  return mongoose.connect(url);
}
