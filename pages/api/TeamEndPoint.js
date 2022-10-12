import { createRouter } from "next-connect";
import AgileTeam from "../../Models/agileTeam";
import mongoose from "mongoose";
import multer from "multer";
import bodyParser from "body-parser";
import Release from "../../Components/ProductOwner/Release";
import parseJson from "parse-json";
import { parse } from "postcss";

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
        return;
      });

    if (req.query.email) {
      const data = await AgileTeam.find({ teamOwner: req.query.email });
      return res.status(200).json(data);
    }

    if (req.query.teamMemberId) {
      const data = await AgileTeam.find({
        "members._id": req.query.teamMemberId,
      }).catch((err) => {
        console.log(err);
      });

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
        return;
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
          _id: req.body.id,
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

      if (TeamData.Map) {
        const sentStory = {
          AcceptanceCriteria: req.body.AcceptanceCriteria,
          AssignedTo: req.body.AssignedTo,
          DateCreated: req.body.DateCreated,
          PriorityRank: req.body.PriorityRank,
          Release: req.body.Release,
          completed: false,
          inProgress: false,
          storyPoints: req.body.storyPoints,
          theme: {
            name: req.body.themeName,
            color: req.body.themeColor,
          },
          name: req.body.name,
          _id: req.body.id,
        };

        if (TeamData.Map[req.query.releaseCurrentId]) {
          TeamData.Map = {
            ...TeamData.Map,
            [req.query.releaseCurrentId]: [
              ...TeamData.Map[req.query.releaseCurrentId],
              sentStory,
            ],
          };
        } else {
          TeamData.Map = {
            ...TeamData.Map,
            [req.query.releaseCurrentId]: [sentStory],
          };
        }
      }

      Object.entries(TeamData.teamData.sprints).forEach((item) => {
        const sentStory = {
          AcceptanceCriteria: req.body.AcceptanceCriteria,
          AssignedTo: req.body.AssignedTo,
          DateCreated: req.body.DateCreated,
          PriorityRank: req.body.PriorityRank,
          Release: req.body.Release,
          completed: false,
          inProgress: false,
          storyPoints: req.body.storyPoints,
          theme: {
            name: req.body.themeName,
            color: req.body.themeColor,
          },
          name: req.body.name,
          _id: req.body.id,
        };
        if (item[0] === req.query.releaseCurrentId) {
          item[1].unSelected = [...item[1].unSelected, sentStory];
        }
      });

      console.log("teamSPIRTS", TeamData.teamData.sprints);

      const UpdatedTeamWithUpdatedRelease = await AgileTeam.findByIdAndUpdate(
        req.query.teamCurrentId,
        {
          Release: UpdatedRelease,
          teamData: TeamData.teamData,
          Map: TeamData.Map,
        },
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
      const UpdatedTeamWithStoriesAndEpics = await AgileTeam.findById(
        req.query.teamId
      ).catch((err) => {
        console.log(err);
      });

      console.log("dataFRom", UpdatedTeamWithStoriesAndEpics.teamData.sprints);

      const newSprints = UpdatedTeamWithStoriesAndEpics.teamData.sprints;

      const id = req.query.releaseId;
      console.log("thedata", {
        [id]: parseJson(req.body.Sprint),
        ...newSprints,
      });
      newSprints[id] = parseJson(req.body.Sprint);
      const updatedFinalSprints = {
        ...newSprints,
      };
      const teamUpdatedwithSprints = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        {
          $set: {
            teamData: {
              sprints: updatedFinalSprints,
            },
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

      const Test = parseJson(req.body.newStories);

      let TestScenc = parseJson(req.body.newMaps);

      Test.forEach((item) => {
        TestScenc[req.query.releaseId].forEach((scenc) => {
          if (scenc.tName) {
            scenc.pins.forEach((pin) => {
              if (pin._id === item._id) {
                if (pin.theme.name != item.theme.name) {
                  const newArra = scenc.pins.filter((nw) => {
                    return nw._id != pin._id;
                  });
                  const element = scenc.pins.filter((nw) => {
                    return nw._id === pin._id;
                  });

                  element[0].theme = item.theme;

                  scenc.pins = newArra;

                  if (element[0].theme.name === "NoTheme") {
                    TestScenc[req.query.releaseId].push(element[0]);
                    return;
                  }

                  if (
                    TestScenc[req.query.releaseId].find((found) => {
                      return found.tName === element[0].theme.name;
                    })
                  ) {
                    TestScenc[req.query.releaseId].forEach((po) => {
                      if (po.tName === element[0].theme.name) {
                        po.pins = [...po.pins, element[0]];
                      }
                    });
                  } else {
                    TestScenc[req.query.releaseId].push({
                      tName: element[0].theme.name,
                      pins: [element[0]],
                    });
                  }
                }
              }
            });
          } else {
            if (item._id === scenc._id) {
              if (item.theme.name != scenc.theme.name) {
                const NewTest = TestScenc[req.query.releaseId].filter(
                  (newT) => {
                    return newT._id != scenc._id;
                  }
                );
                const element = TestScenc[req.query.releaseId].filter(
                  (newT) => {
                    return newT._id === scenc._id;
                  }
                );
                element[0].theme = item.theme;
                TestScenc[req.query.releaseId] = NewTest;
                if (
                  TestScenc[req.query.releaseId].find((Sc) => {
                    return Sc.tName === element[0].theme.name;
                  })
                ) {
                  TestScenc[req.query.releaseId].forEach((pp) => {
                    if (pp.tName === element[0].theme.name) {
                      pp.pins = [...pp.pins, element[0]];
                    }
                  });
                } else {
                  TestScenc[req.query.releaseId].push({
                    tName: element[0].theme.name,
                    pins: [element[0]],
                  });
                }
              }
            }
          }
        });
      });

      console.log("foinn", TestScenc[req.query.releaseId]);

      const targetedSprint =
        UpdatedTeamWithStoriesAndEpics.teamData.sprints[req.query.releaseId];
      const newStories = [...parseJson(req.body.newStories)];
      if (targetedSprint) {
        if (targetedSprint.sprints) {
          targetedSprint.sprints.forEach((item) => {
            item.stories.forEach((story) => {
              newStories.find((releaseStory) => {
                if (releaseStory._id === story._id) {
                  story.theme = releaseStory.theme;
                }
              });
            });
          });
        }
        if (targetedSprint.unSelected) {
          targetedSprint.unSelected.forEach((story) => {
            newStories.find((releaseStory) => {
              if (releaseStory._id === story._id) {
                story.theme = releaseStory.theme;
              }
            });
          });
        }
      }

      console.log(
        "newNew",
        UpdatedTeamWithStoriesAndEpics.teamData.sprints[req.query.releaseId]
      );

      if (newReleases) {
        const finalUpdatedTeam = await AgileTeam.findByIdAndUpdate(
          req.query.teamId,
          {
            Map: TestScenc,
            Release: newReleases,
            teamData: UpdatedTeamWithStoriesAndEpics.teamData,
          },
          { new: true }
        ).catch((err) => {
          console.log(err);
        });

        if (finalUpdatedTeam) {
          return res.status(200).json(finalUpdatedTeam);
        }
      }
    }
    if (req.body.userFields) {
      const acceptedTeam = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        {
          $addToSet: { members: parseJson(req.body.userFields) },
        },
        { new: true }
      ).catch((err) => {
        console.log("accepterr", err);
      });

      return res.status(200).json(acceptedTeam);
    }
    if (req.query.deletingPin) {
      const teamToBeUpdated = await AgileTeam.findById(req.query.teamId).catch(
        (err) => {
          console.log(err);
        }
      );
      if (typeof teamToBeUpdated.Map === "object") {
        Object.entries(teamToBeUpdated.Map).forEach((item) => {
          if (item[0] === req.query.releaseId) {
            const newMappedArr = item[1].map((pin) => {
              if (pin.name) {
                if (pin._id != req.query.pinId) {
                  return pin;
                }
              } else if (pin.tName) {
                console.log("pl", pin.tName);
                const pinPins = pin.pins.filter((p) => {
                  if (p._id === req.query.pinId) {
                    console.log("real", p);
                  }
                  return p._id != req.query.pinId;
                });
                console.log(pin.tName, pinPins);
                return { ...pin, pins: pinPins };
              }
            });
            console.log("ss", newMappedArr);
            const filteredNewMAP = newMappedArr.filter((found) => {
              if (found) {
                return found;
              }
            });
            teamToBeUpdated.Map = {
              ...teamToBeUpdated.Map,
              [req.query.releaseId]: filteredNewMAP,
            };
          }
        });
      }

      teamToBeUpdated.Release.forEach((item) => {
        console.log("rann", item._id);
        if (item._id.toString() === req.query.releaseId) {
          const newAgilePins = item.agilePins.filter((pins) => {
            console.log(pins._id, req.query.pinId);
            return pins._id != req.query.pinId;
          });
          item.agilePins = newAgilePins;
        }
      });
      if (teamToBeUpdated.teamData.sprints) {
        if (teamToBeUpdated.teamData.sprints[req.query.releaseId]) {
          teamToBeUpdated.teamData.sprints[req.query.releaseId].sprints.forEach(
            (sprint) => {
              const newStories = sprint.stories.filter((story) => {
                return story._id != req.query.pinId;
              });
              sprint.stories = newStories;
            }
          );

          if (teamToBeUpdated.teamData.sprints[req.query.releaseId]) {
            const newStories = teamToBeUpdated.teamData.sprints[
              req.query.releaseId
            ].unSelected.filter((pin) => {
              return pin._id != req.query.pinId;
            });
            teamToBeUpdated.teamData.sprints[req.query.releaseId].unSelected =
              newStories;
          }
        }
      }
      console.log("ss", teamToBeUpdated);
      const newUpdatedTeam = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        teamToBeUpdated,
        { new: true }
      ).catch((err) => {
        console.log(err);
      });
      return res.status(200).json(newUpdatedTeam);
    }
    if (req.query.interaction) {
      console.log("sentA");
      const newUpdatedTeam = await AgileTeam.findById(req.query.teamId).catch(
        (err) => {
          console.log(err);
        }
      );

      newUpdatedTeam.teamData.sprints[req.query.releaseId].sprints.forEach(
        (sprint) => {
          const newSprintStories = sprint.stories.map((story) => {
            if (story) {
              if (parseJson(req.body.pinInteraction)._id === story._id) {
                return parseJson(req.body.pinInteraction);
              } else return story;
            }
          });
          sprint.stories = newSprintStories;
        }
      );
      const finalNewUpdatedTeam = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        newUpdatedTeam,
        { new: true }
      ).catch((err) => {
        console.log(err);
      });
      console.log(finalNewUpdatedTeam);
      return res.status(200).json(finalNewUpdatedTeam);
    }
    if (req.body.Map) {
      const teamWithSavedMap = await AgileTeam.findByIdAndUpdate(
        req.query.currentMapTeam,
        { Map: parseJson(req.body.Map) },
        { new: true }
      ).catch((err) => {
        console.log(err);
      });

      return res.status(200).json(teamWithSavedMap);
    }
    if (req.body.Message) {
      const teamAfterMessage = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        { $push: { "chatHistory.Chats": parseJson(req.body.Message) } },
        { new: true }
      ).catch((err) => {
        console.log(err);
      });
      if (teamAfterMessage) {
        res.status(200).json(teamAfterMessage);
      }
    }
    if (req.query.deleteTeamMessages) {
      const team = parseJson(req.body.emptyChatTeam);
      const teamAfterUpdate = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        team,
        { new: true }
      ).catch((err) => {
        console.log(err);
      });
      if (teamAfterUpdate) {
        return res.status(200).json(teamAfterUpdate);
      }
    }
  })
  .delete(uploadImageMiddleWare, async (req, res) => {
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
      const TeamFound = await AgileTeam.findById(req.query.teamId).catch(
        (err) => {
          console.log(err);
        }
      );
      const newMap = {};
      const newSprint = {};
      if (TeamFound) {
        Object.entries(TeamFound.Map).map((item) => {
          if (item[0] != req.query.ReleaseId) {
            newMap[item[0]] = item[1];
          }
        });

        Object.entries(TeamFound.teamData.sprints).map((item) => {
          if (item[0] != req.query.ReleaseId) {
            newSprint[item[0]] = item[1];
          }
        });
      }

      const newRelease = TeamFound.Release.filter((release) => {
        return release._id != req.query.ReleaseId;
      });
      /* const newTeamAfterReleaseDelete = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        { Map: newMap, $pull: { Release: { _id: req.query.ReleaseId } } },
        { new: true }
      ).catch((err) => {
        console.log(err);
      }); */

      const newTeamAfterReleaseDelete = await AgileTeam.findByIdAndUpdate(
        req.query.teamId,
        { Map: newMap, Release: newRelease, teamData: { sprints: newSprint } },
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
