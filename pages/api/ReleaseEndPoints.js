import { AgileRelease } from "../../Models/agileRelease";
import { createRouter } from "next-connect";
import mongoose from "mongoose";

const router = createRouter();

router
  .get(async (req, res) => {
    console.log("request ran");
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
      const data = await AgileRelease.find({});
      if (!data) {
        return res.status(404).json(data);
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
    const newRelease = await AgileRelease.create({
      owner: req.body.owner,
      teamId: req.body.teamId,
      name: req.body.name,
    });
    return res.status(201).json(newRelease);
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Router ReleaseEndPoint Error!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
