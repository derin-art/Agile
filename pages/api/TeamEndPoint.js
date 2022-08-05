import { createRouter } from "next-connect";
import AgileTeam from "../../Models/agileTeam";
import mongoose from "mongoose";
import multer from "multer";
import bodyParser from "body-parser";

const router = createRouter();

const TeamJson = bodyParser.json();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const uploadImageMiddleWare = upload.single("Image");

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

    if (req.query.email) {
      const data = await AgileTeam.find({ teamOwner: req.query.email });
      return res.status(200).json(data);
    }

    const getRequest = async () => {
      const data = await AgileTeam.find({});
      if (!data) {
        return res.status(404).json({ message: "Item does not exist" });
      }
      return res.status(200).json(data);
    };

    return getRequest();
  })
  .post(uploadImageMiddleWare, async (req, res) => {
    console.log("Post team request");
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

    const name = req.body.name;
    const email = req.body.email;
    console.log(req.body, "actual body");

    const createdTeam = await AgileTeam.create({
      name: name,
      teamOwner: email,
    });
    console.log(createdTeam);
    return res.status(201).json(createdTeam);
  })
  .patch(async (req, res) => {
    if (req.body.newRelease) {
      const updatedTeam = await AgileTeam.findByIdAndUpdate(
        req.query.id,
        { $push: { Release: req.body.newRelease } },
        {
          new: true,
        }
      ).catch((err) => {
        console.log(err);
      });
      return res.status(200).json(updatedTeam);
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Router TeamEndPoint Error!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});