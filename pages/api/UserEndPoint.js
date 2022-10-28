import mongoose from "mongoose";
import { AgileUser } from "../../Models/agileUser";
import multer from "multer";
import nextConnect, { createRouter } from "next-connect";
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const router = createRouter();

const uploadImageMiddleWare = upload.single("Image");

router
  .get(async (req, res) => {
    console.log("Request sent");

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
        return;
      });

    if (req.query.userName) {
      const getRequest = async () => {
        const data = await AgileUser.find({
          name: { $regex: req.query.userName },
        });
        if (!data) {
          return res.status(404).json({ message: "Item does not exist" });
        }
        return res.status(200).json(data);
      };
      return getRequest();
    }
    if (req.query.email) {
      const getRequest = async () => {
        const data = await AgileUser.findOne({ email: req.query.email });
        if (!data) {
          return res.statusCode(404).json({ message: "Item does not exist" });
        }
        return res.status(200).json(data);
      };
      return getRequest();
    } else {
      const getRequest = async () => {
        console.log(req.body);
        const data = await AgileUser.find({});
        if (!data) {
          return res.status(404).json({ message: "Item does not exist" });
        }
        return res.status(200).json(data);
      };
      return getRequest();
    }
  })

  .post(uploadImageMiddleWare, async (req, res) => {
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
        return;
      });
    if (req.file) {
      const img = fs.readFileSync(req.file.path);
      const encode_img = img.toString("base64");
      const createdUser = await AgileUser.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePicture: {
          data: new Buffer(encode_img, "base64"),
          contentType: req.file.mimetype,
        },
      });
      return res.status(201).json(createdUser);
    } else {
      const createdUser = await AgileUser.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gitHub: req.body.gitHub,
      });

      return res.status(201).json(createdUser);
    }
  })

  .patch(uploadImageMiddleWare, async (req, res) => {
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
        return;
      });
    if (req.query.Teamemail) {
      const userEdited = await AgileUser.findOneAndUpdate(
        { email: req.query.Teamemail },
        {
          $addToSet: {
            teamRequests: {
              accepted: false,
              teamId: req.query.teamId,
              teamName: req.query.teamName,
              fromEmail: req.query.fromEmail,
            },
          },
        },
        { new: true }
      ).catch((err) => {
        console.log(err);
        return;
      });

      return res.status(200).json(userEdited);
    }

    if (req.body.TeamRole) {
      console.log("sent", req.query.email, "role", req.body.TeamRole);
      const patchedUser = await AgileUser.findOneAndUpdate(
        { email: req.query.email },
        /* { role: req.body.TeamRole }, */
        {
          new: true,
        }
      ).catch((err) => {
        console.log(err);
        return res.status(500).send(err);
      });
      return res.status(200).json(patchedUser);
    }

    if (req.query.userId) {
      const updatedUser = await AgileUser.findByIdAndUpdate(
        req.query.userId,
        {
          $pull: { teamRequests: { teamId: req.query.rejectTeamId } },
        },
        { new: true }
      ).catch((err) => {
        console.log(err);
        return res.send(err);
      });

      return res.status(200).json(updatedUser);
    }
  })
  .delete(async (req, res) => {});
/* export default async function handler(req, res) {
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
      if(req.body.profilePicture){
          const createdUser = await AgileUser.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture
          });

      }
      else{
          const createdUser = await AgileUser.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
      }
  };
  if (req.method === "POST") {
    return postFunction();
  }
  const getRequest = async () => {
    const data = await AgileUser.find({});
    return res.status(200).json(data);
  };
  if (req.method == "GET") {
    return getRequest();
  }
  mongoose.connection.close();
}
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Router UserEndPoint Error!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
