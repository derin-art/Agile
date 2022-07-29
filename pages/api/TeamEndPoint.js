import { createRouter } from "next-connect";
import AgileTeam from "../../Models/agileTeam";
import mongoose from "mongoose";

const router = createRouter();

router
  .get(async (req, res) => {
    console.log("Team Request");
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

    const getRequest = async () => {
      const data = await AgileTeam.find({});
      if (!data) {
        return res.status(404).json({ message: "Item does not exist" });
      }
      return res.status(200).json(data);
    };

    return getRequest();
  })
  .post(async (req, res) => {
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

    const postRequest = async () => {
      const createdTeam = AgileTeam.create({});
    };
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Router TeamEndPoint Error!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
