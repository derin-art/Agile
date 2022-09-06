import { createRouter } from "next-connect";
import AgileTeam from "../../Models/agileTeam";
import mongoose from "mongoose";
import multer from "multer";
import bodyParser from "body-parser";
import Release from "../../Components/ProductOwner/Release";
import parseJson from "parse-json";

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
    const Summary = req.body.Summary;
    console.log(req.body, "actual body");

    const createdTeam = await AgileTeam.create({
      name: name,
      teamOwner: email,
      teamSummary: Summary,
      teamData: {
        sprints: {},
      },
    });
    console.log(createdTeam);
    return res.status(201).json(createdTeam);
  })
  .patch(uploadImageMiddleWare, async (req, res) => {
    console.log("Sent");

    if (req.body.newRelease) {
      console.log("IDD", req.body.newRelease);
      console.log(req.body.dateEnd, req.body.dateStart, "dates");
      const updatedTeam = await AgileTeam.findOneAndUpdate(
        { _id: req.query.id },
        {
          $push: {
            Release: {
              agilePins: req.body.agilePins,
              name: req.body.name,
              owner: req.body.owner,
              id: req.body.id,
              dateStart: req.body.dateStart,
              dateEnd: req.body.dateEnd,
            },
          },
        },
        { new: true }
      ).catch((err) => {
        console.log(err);
      });
      return res.status(200).json(updatedTeam);
    }

    if (req.body.newStory) {
      const retrievedTeam = await AgileTeam.findById(
        req.query.teamCurrentId
      ).catch((err) => {
        console.log(err);
      });
      const TeamData = retrievedTeam;

      const UpdatedRelease = TeamData.Release.map((item) => {
        const sentStory = {
          AcceptanceCriteria: req.body.AcceptanceCriteria,
          AssignedTo: req.body.AssignedTo,
          DateCreated: req.body.DateCreated,
          PriorityRank: req.body.PriorityRank,
          Release: req.body.Release,
          completed: req.body.completed,
          inProgress: req.body.inProgress,
          storyPoints: req.body.storyPoints,
          theme: {
            name: req.body.themeName,
            color: req.body.themeColor,
          },
          name: req.body.name,
        };
        console.log(item._id, req.query.releaseCurrentId);
        if (item) {
          if (item._id.toString() === req.query.releaseCurrentId) {
            console.log("Fit");
            console.log(item);
            item.agilePins.push(sentStory);
            return { ...item, agilePins: [...item.agilePins, sentStory] };
          } else {
            return item;
          }
        }
      });
      const UpdatedTeamWithUpdatedRelease = await AgileTeam.findByIdAndUpdate(
        req.query.teamCurrentId,
        { Release: UpdatedRelease },
        { new: true }
      ).catch((err) => {
        console.log(err);
      });

      if (UpdatedTeamWithUpdatedRelease) {
        return res.status(200).json(UpdatedTeamWithUpdatedRelease);
      }
    }
    if (req.query.updateTeamWithSprints) {
      console.log("parse", parseJson(req.body.Sprint));

      const id = req.query.releaseId;
      const teamUpdatedwithSprints = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        {
          $set: {
            teamData: { sprints: { [id]: parseJson(req.body.Sprint) } },
          },
        },
        { new: true }
      );
      return res.status(200).json(teamUpdatedwithSprints);
    }
    if (req.query.updateTeamWithStories) {
      const UpdatedTeamWithStoriesAndEpics = await AgileTeam.findById(
        req.query.teamId
      ).catch((err) => {
        console.log(err);
      });

      console.log("Latest", UpdatedTeamWithStoriesAndEpics);
      const newReleases = UpdatedTeamWithStoriesAndEpics.Release.map(
        (release) => {
          if (release._id.toString() === req.query.releaseId) {
            console.log("release", release);
            release.agilePins = parseJson(req.body.newStories);
            return release;
          } else {
            return release;
          }
        }
      );
      if (newReleases) {
        const finalUpdatedTeam = await AgileTeam.findByIdAndUpdate(
          req.query.teamId,
          { Release: newReleases },
          { new: true }
        ).catch((err) => {
          console.log(err);
        });

        if (finalUpdatedTeam) {
          return res.status(200).json(finalUpdatedTeam);
        }
      }
    }
  })
  .delete(uploadImageMiddleWare, async (req, res) => {
    console.log("iddddd", req.query.id, req.query.teamDelete);
    if (req.query.teamDelete) {
      console.log("deleting team");
      const newTeamAfterDelete = await AgileTeam.findByIdAndDelete(
        req.query.id
      ).catch((err) => {
        console.log(err);
      });

      if (newTeamAfterDelete) {
        return res.status(200).json(newTeamAfterDelete);
      }
    }
    if (req.query.deleteRelease) {
      console.log(req.query.ReleaseId);
      const newTeamAfterReleaseDelete = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        { $pull: { Release: { _id: req.query.ReleaseId } } },
        { new: true }
      ).catch((err) => {
        console.log(err);
      });
      if (newTeamAfterReleaseDelete) {
        return res.status(200).json(newTeamAfterReleaseDelete);
      }
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
