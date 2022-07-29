import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export default async function Mongo(handler, req, res) {
  if (mongoose.connections[0]) {
    await mongoose.connect(
      "mongodb+srv://AgileManager:m041kVFXynBH6fMe@cluster0.lth3d.mongodb.net/AgileRecords?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    handler(req, res);
  } else {
    handler(req, res);
  }
}
