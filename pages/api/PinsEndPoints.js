import { AgilePin } from "../../Models/agilePins";
import { createRouter } from "next-connect";
import mongoose from "mongoose";
import multer from "multer";
import { async } from "@firebase/util";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const uploadImageMiddleWare = upload.single("Image");

const router = createRouter();

router.post(uploadImageMiddleWare, async (req, res) => {
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

  const data = await AgilePin.create({
    name: req.body.name,
    Release: req.body.Release,
    PriorityRank: req.body.PriorityRank,
    AcceptanceCriteria: req.body.AcceptanceCriteria,
  }).catch((err) => {
    console.log(err);
  });
  if (data) {
    return res.status(201).json(data);
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
    res.status(500).end("Router PinsEndPoint Error!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
