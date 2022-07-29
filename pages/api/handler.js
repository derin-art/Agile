import mongoose from "mongoose";
import UserModel from "../../Models/user";

export default async function handler(req, res) {
  console.log("MongooseConnect", mongoose.connection);
  await mongoose
    .connect(
      "mongodb+srv://AgileManager:m041kVFXynBH6fMe@cluster0.lth3d.mongodb.net/AgileRecords?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to server");
    })
    .catch((err) => {
      console.log("Mongo ERR", err);
    });

  const postFunction = async () => {
    const data = await UserModel.create({
      name: req.body.name,
      Age: req.body.Age,
    });
    const finalRes = await data.toJSON();
    return res.status(200).json(finalRes);
  };
  if (req.method === "POST") {
    return postFunction();
  }
  const getRequest = async () => {
    const data = await UserModel.find({});
    return res.status(200).json(data);
  };
  if (req.method == "GET") {
    return getRequest();
  }
  mongoose.connection.close();
}
