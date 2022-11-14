import react, { useState, useEffect } from "react";
import firebaseApp from "../pages/api/firebase";
import axios from "axios";
import FormData from "form-data";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { async } from "@firebase/util";

import stringify from "json-stringify";
import { KeyboardReturnRounded } from "@material-ui/icons";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function usefirebaseAuthState() {
  const [messagesBeforeUpdate, setMessagesBeforeUpdate] = useState([]);
  const [currentJoinedTeam, setCurrentJoinedTeam] = useState(null);
  const [allCurrentJoinedTeam, setAllCurrentJoinedTeam] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userTeamData, setUserTeamData] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentReleaseEpics, setCurrentReleaseEpics] = useState([]);
  const [currentOpenRelease, setCurrentOpenRelease] = useState(null);
  const [currentPinsOpen, setCurrentPinsOpen] = useState(null);
  const [currentPinsOpenRevised, setCurrentPinsOpenRevised] = useState(null);
  const [currentPinsEpics, setCurrentPinEpics] = useState(null);
  const [themes, setTheme] = useState([]);

  console.log("id current", themes, currentTeam, currentOpenRelease);
  const clear = () => {
    setAuthUser(null);
    setLoading(false);
    setUserData(null);
    setCurrentJoinedTeam(null);
    setCurrentTeam(null);
    setUserTeamData(null);
    setAllCurrentJoinedTeam(null);
  };

  const getUserData = async (email) => {
    const formdata = new FormData();
    formdata.append("email", email);
    console.log("emailData", email);
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_USER_ROUTE}?email=${email}`)
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      setUserData(data.data);
    }
    console.log(data);
  };

  const auth = getAuth();

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe =
      getAuth(firebaseApp).onAuthStateChanged(authStateChanged);

    return () => unsubscribe();
  }, []);

  const createMongoDbUser = async (name, email, password, role, gitHubLink) => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gitHub", gitHubLink);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const createdMongoDbUser = await axios
      .post(
        process.env.NEXT_PUBLIC_API_USER_ROUTE,
        { name: name, email, password, gitHub: gitHubLink },
        config
      )
      .catch((err) => {
        console.log(err);
        return err;
      });
    console.log(createdMongoDbUser);
  };

  const patchedMongoDbUser = async (email, role) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const formdata = new FormData();
    formdata.append("TeamRole", role);
    console.log("TeamRole", role);
    console.log("loginEmail", email);

    const editedUser = await axios
      .patch(`${process.env.NEXT_PUBLIC_API_USER_ROUTE}?email=${email}`, {
        TeamRole: role,
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    console.log("Login details", editedUser);

    setUserData(editedUser.data);
  };

  const setCurrentTeamAvailable = (id) => {
    const current = userTeamData.filter((item) => item._id === id);
    if (current) {
      setCurrentTeam(current);
      setMessagesBeforeUpdate(current[0].chatHistory);
    }
  };

  const SignInWithEmailAndPassword = (email, password, role) => {
    /*  getUserData(email); */

    /*   patchedMongoDbUser(email, role).catch((err) => {
      console.log(err);
      return;
    }); */

    return signInWithEmailAndPassword(auth, email, password);
  };

  const getUserTeam = async (email) => {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?email=${email}`)
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      console.log(data.data);
      setUserTeamData(data.data);
      return data.data;
    }
  };

  const CreateTeam = async (name, email, Summary) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("Summary", Summary);
    const createdTeamData = await axios
      .post(process.env.NEXT_PUBLIC_API_TEAM_ROUTE, { name, email, Summary })
      .catch((err) => {
        console.log(err);
      });
    console.log(createdTeamData);
    if (createdTeamData) {
      return createdTeamData;
    }
  };

  const CreateUserWithEmailAndPassword = (
    email,
    password,
    name,
    gitHubLink,
    role
  ) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      createMongoDbUser(name, email, password, role, gitHubLink);
    });
  };

  const SignOut = () => {
    return signOut(auth).then(() => {
      clear();
    });
  };

  const PatchTeamWithNewRelease = async (teamId, releaseData, config) => {
    console.log("Patchhh", releaseData);
    const formdata = new FormData();
    formdata.append("newRelease", releaseData);
    formdata.append("agilePins", releaseData.agilePins);
    formdata.append("name", releaseData.name);
    formdata.append("owner", releaseData.owner);
    formdata.append("id", releaseData._id);
    formdata.append("dateEnd", releaseData.dateEnd);
    formdata.append("dateStart", releaseData.dateStart);

    console.log("Made it through");
    const updatedTeamWithRelease = await axios
      .patch(`${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?id=${teamId}`, {
        newRelease: releaseData,
        agilePins: releaseData.agilePins,
        name: releaseData.name,
        owner: releaseData.owner,
        id: releaseData._id,
        dateEnd: releaseData.dateEnd,
        dateStart: releaseData.dateStart,
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("UpdatedTeam", updatedTeamWithRelease);
    if (updatedTeamWithRelease) {
      setCurrentTeam([updatedTeamWithRelease.data]);
    }
  };

  const CreateRelease = async (owner, teamId, name, startDate, endDate) => {
    const formdata = new FormData();
    formdata.append("owner", owner);
    formdata.append("teamId", teamId);
    formdata.append("name", name);
    formdata.append("startDate", startDate);
    formdata.append("endDate", endDate);
    const data = await axios
      .post(process.env.NEXT_PUBLIC_API_RELEASE_ROUTE, {
        owner: owner,
        teamId: teamId,
        name: name,
        startDate,
        endDate,
      })
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      console.log("DDD", data);
      console.log("dd", typeof data.data);
      PatchTeamWithNewRelease(teamId, data.data);

      return data.data;
    }
  };

  const addUserStoryToTeam = async (data, teamCurrentId, releaseCurrentId) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formdata = new FormData();
    formdata.append("AcceptanceCriteria", data.AcceptanceCriteria);
    formdata.append("AssignedTo", data.AssignedTo);
    formdata.append("DateCreated", data.DateCreated);
    formdata.append("PriorityRank", data.PriorityRank);
    formdata.append("Release", data.Release);
    formdata.append("completed", data.completed);
    formdata.append("inProgress", data.inProgress);
    formdata.append("themeName", data.theme.name);
    formdata.append("themeColor", data.theme.color);
    formdata.append("name", data.name);
    formdata.append("newStory", true);
    formdata.append("storyPoints", data.storyPoints);
    formdata.append("id", data._id);

    const result = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?teamCurrentId=${teamCurrentId}&releaseCurrentId=${releaseCurrentId}`,
        {
          AcceptanceCriteria: data.AcceptanceCriteria,
          AssignedTo: data.AssignedTo,
          DateCreated: data.DateCreated,
          PriorityRank: data.PriorityRank,
          Release: data.Release,
          completed: data.completed,
          inProgress: data.inProgress,
          themeName: data.theme.name,
          themeColor: data.theme.color,
          name: data.name,
          newStory: true,
          storyPoints: data.storyPoints,
          id: data._id,
        }
      )
      .catch((err) => console.log(err));
    if (result) {
      console.log(result);
      const UpdatedReleaseWithStory = result.data.Release.filter(
        (item) => item._id === releaseCurrentId
      );
      const UpdatedTeamDataWithStory = result.data.teamData;

      if (UpdatedReleaseWithStory) {
        const EarlyUniqueEpics = UpdatedReleaseWithStory[0].agilePins.map(
          (item) => {
            if (item) {
              return item.theme.name;
            } else {
              return;
            }
          }
        );
        const uniqueEpics = [...new Set(EarlyUniqueEpics)];

        /*      setCurrentPinsOpen({
        allPins: current[0].agilePins,
      }); */

        const finalObject = {};
        uniqueEpics.forEach((name) => {
          if (name) {
            const filterPins = UpdatedReleaseWithStory[0].agilePins.filter(
              (item) => {
                if (item) {
                  return item.theme.name === name;
                }
              }
            );
            finalObject = { ...finalObject, [name]: filterPins };
          }
        });
        setCurrentPinsOpen(finalObject);

        console.log(UpdatedReleaseWithStory, "Updated");
        setCurrentOpenRelease(UpdatedReleaseWithStory);

        setCurrentReleaseEpics((prev) => {
          const allCurrentEpics = [];
          UpdatedReleaseWithStory[0].agilePins.forEach((item) => {
            if (item) {
              allCurrentEpics.push(item.theme);
            }
          });
          console.log("allCUrenr", allCurrentEpics);
          return allCurrentEpics;
        });

        const nonStateReleaseEpics = UpdatedReleaseWithStory[0].agilePins.map(
          (item) => {
            if (item) {
              return item.theme;
            }
          }
        );

        const allSaveThemes = [];
        console.log(
          "currentReleaseEpic",
          currentReleaseEpics,
          nonStateReleaseEpics
        );

        uniqueEpics.forEach((name) => {
          const found = nonStateReleaseEpics.find((item) => {
            if (item) {
              return name === item.name;
            }
          });

          allSaveThemes.push(found);
        });
        setTheme(allSaveThemes);

        setCurrentTeam((prev) => {
          const newRelease = prev[0].Release.map((item) => {
            if (item._id === releaseCurrentId) {
              return UpdatedReleaseWithStory[0];
            } else {
              return item;
            }
          });
          console.log("teamDataBefore", {
            ...prev[0],
            Map: result.data.Map,
            Release: newRelease,
            teamData: UpdatedTeamDataWithStory,
          });

          return [
            {
              ...prev[0],
              Map: result.data.Map,
              Release: newRelease,
              teamData: UpdatedTeamDataWithStory,
            },
          ];
        });
      }
    }
  };

  const addUserStory = async (
    name,
    Release,
    storyPoints,
    AcceptanceCriteria,
    color
  ) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("Release", Release);
    formdata.append("PriorityRank", color);
    formdata.append("StoryPoints", storyPoints);
    formdata.append("AcceptanceCriteria", AcceptanceCriteria);
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_STORY_ROUTE}`, {
        name,
        Release,
        PriorityRank: color,
        StoryPoints: storyPoints,
        AcceptanceCriteria,
      })
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      console.log(data);
      try {
        addUserStoryToTeam(
          data.data,
          currentTeam[0]._id,
          currentOpenRelease[0]._id
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const setCurrentOpenReleaseData = (id) => {
    setTheme((prev) => []);
    const current = currentTeam[0].Release.filter((item) => {
      if (item) {
        return item._id === id;
      }
    });
    setCurrentReleaseEpics((prev) => {
      const allCurrentEpics = [];
      current[0].agilePins.forEach((item) => {
        if (item) {
          allCurrentEpics.push(item.theme);
        }
      });
      return allCurrentEpics;
    });
    console.log("set", current, id);
    if (current) {
      setCurrentOpenRelease(current);
      const EarlyUniqueEpics = current[0].agilePins.map((item) => {
        if (item) {
          return item.theme.name;
        } else {
          return;
        }
      });
      const uniqueEpics = [...new Set(EarlyUniqueEpics)];
      uniqueEpics.forEach((name) => {});
      /*      setCurrentPinsOpen({
        allPins: current[0].agilePins,
      }); */

      const allSaveThemes = [];
      console.log("currentReleaseEpic", currentReleaseEpics);

      uniqueEpics.forEach((name) => {
        const found = currentReleaseEpics.find((item) => {
          return name === item.name;
        });

        allSaveThemes.push(found);
      });
      setTheme(allSaveThemes);

      const finalObject = {};
      uniqueEpics.forEach((name) => {
        if (name) {
          const filterPins = current[0].agilePins.filter((item) => {
            if (item) {
              return item.theme.name === name;
            }
          });
          finalObject = { ...finalObject, [name]: filterPins };
        }
      });

      console.log("finalHeaven", finalObject);
      setCurrentPinsOpen(finalObject);

      setCurrentPinsOpenRevised((prev) => {
        const currentReleaseEpicsNames = currentReleaseEpics.map((item) => {
          return item.name;
        });

        const finalArr = {};
        const defaultArr = {};
        const finalModefiedArr = {};
        let arrNo = 0;
        console.log("coulde", current[0].agilePins);
        for (let i = 0; i < current[0].agilePins.length; i += 1) {
          if (i % 4 === 0) {
            arrNo++;
            defaultArr = { ...defaultArr, [arrNo.toString()]: [] };
            console.log(arrNo, "No");
          }

          defaultArr[arrNo].push(current[0].agilePins[i]);

          console.log(defaultArr, "default");
        }

        finalArr = { ...finalArr, defaultArr };

        uniqueEpics.forEach((name) => {
          const defaultArrMod = {};
          let arrNo = 0;
          const filteredAgilePins = current[0].agilePins.filter((item) => {
            if (item) {
              if (item.theme.name === name) {
                return item;
              }
            }
          });

          for (let i = 0; i < filteredAgilePins.length; i += 1) {
            if (i % 4 === 0) {
              arrNo++;
              defaultArrMod = { ...defaultArrMod, [arrNo.toString()]: [] };
              console.log(arrNo, "No");
            }

            defaultArrMod[arrNo].push(filteredAgilePins[i]);

            console.log(defaultArrMod, "defaultM");
          }

          finalModefiedArr = { ...finalModefiedArr, [name]: defaultArrMod };
        });
        console.log("Modefied", finalModefiedArr);
        finalArr = { ...finalArr, ...finalModefiedArr };
        console.log("finalFor", finalArr);
        return finalArr;
      });

      console.log(currentPinsOpenRevised, "lets gooo");
      console.log(currentPinsOpen, "msms");
    }
    console.log(
      "Auth Reke",
      currentOpenRelease,
      process.env.NEXT_PUBLIC_API_STORY_ROUTE
    );
  };

  const deleteTeam = async (id) => {
    console.log("sentId", id);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const data = await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?id=${id}&teamDelete=${true}`
      )
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      console.log("deletedteam", data.data);
      setUserTeamData((prev) => {
        const item = prev.filter((item) => {
          if (item._id != data.data._id) {
            return item;
          }
        });
        console.log("deleting what", item);
        console.log("prev", prev);
        return item;
      });
    }
  };

  const deleteRelease = async (ReleaseId) => {
    const deletedReleaseTeam = await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?teamId=${
          currentTeam[0]._id
        }&ReleaseId=${ReleaseId}&deleteRelease=${true}`
      )
      .catch((err) => {
        console.log(err);
      });
    if (deletedReleaseTeam) {
      console.log("deletedReleaseData", deletedReleaseTeam.data);
      setCurrentTeam([deletedReleaseTeam.data]);
    }
  };

  const saveStories = async (newRelease) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formdata = new FormData();
    formdata.append("newStories", stringify(newRelease));
    formdata.append("newMaps", stringify(currentTeam[0].Map));
    console.log("dataSent", newRelease);
    const UpdatedTeamWithStories = await axios
      .patch(
        `${
          process.env.NEXT_PUBLIC_API_TEAM_ROUTE
        }?updateTeamWithStories=${true}&teamId=${
          currentTeam[0]._id
        }&releaseId=${currentOpenRelease[0]._id}&newStories=${newRelease}`,
        {
          newStories: stringify(newRelease),
          newMaps: stringify(currentTeam[0].Map),
        }
      )
      .catch((err) => {
        console.log(err);
        return;
      });

    if (UpdatedTeamWithStories) {
      console.log("dtaa", UpdatedTeamWithStories.data);
      const newRelease1 = UpdatedTeamWithStories.data.Release.filter(
        (release) => {
          return currentOpenRelease[0]._id === release._id;
        }
      );
      const EarlyUniqueEpics = newRelease1[0].agilePins.map((item) => {
        if (item) {
          console.log("item", item);
          return item.theme.name;
        } else {
          return;
        }
      });
      const uniqueEpics = [...new Set(EarlyUniqueEpics)];
      const finalObject = {};
      uniqueEpics.forEach((name) => {
        if (name) {
          const filterPins = newRelease1[0].agilePins.filter((item) => {
            if (item) {
              return item.theme.name === name;
            }
          });
          finalObject = { ...finalObject, [name]: filterPins };
        }
      });
      setCurrentReleaseEpics((prev) => {
        const allCurrentEpics = [];
        newRelease1[0].agilePins.forEach((item) => {
          if (item) {
            allCurrentEpics.push(item.theme);
          }
        });
        const allSaveThemes = [];

        const uniqueEpics = [
          ...new Set(allCurrentEpics.map((item) => item.name)),
        ];

        uniqueEpics.forEach((name) => {
          const found = allCurrentEpics.find((item) => {
            return name === item.name;
          });

          allSaveThemes.push(found);
        });
        setTheme(allSaveThemes);
        console.log("ccynic", allCurrentEpics, newRelease1[0]);
        return allCurrentEpics;
      });
      setCurrentPinsOpen(finalObject);
      setCurrentOpenRelease((prev) => {
        const newRelease = UpdatedTeamWithStories.data.Release.filter(
          (release) => {
            return prev[0]._id === release._id;
          }
        );
        console.log("Newww", newRelease);
        return newRelease;
      });

      setCurrentTeam([UpdatedTeamWithStories.data]);
    }

    return UpdatedTeamWithStories;
  };

  const saveSprints = async (Sprint, releaseId) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formdata = new FormData();
    console.log("sprintData", Sprint);
    formdata.append("Sprint", stringify(Sprint));
    const teamAfterSavedSprint = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?teamId=${
          currentTeam[0]._id
        }&updateTeamWithSprints=${true}&releaseId=${releaseId}`,
        { Sprint: stringify(Sprint) }
      )
      .catch((err) => {
        console.log(err);
      });
    if (teamAfterSavedSprint) {
      console.log("teamAfTERS", teamAfterSavedSprint);
      setCurrentTeam([teamAfterSavedSprint.data]);
    }

    return teamAfterSavedSprint;
  };

  const teamRequest = async (email, teamId, teamName, fromEmail) => {
    const data = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_USER_ROUTE}?Teamemail=${email}&teamId=${teamId}&teamName=${teamName}&fromEmail=${fromEmail}`
      )
      .catch((err) => {
        console.log("teamRequestErr", err);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("datatRq", data);
  };

  const teamRequestRejected = async (teamId, userId) => {
    const formdata = new FormData();

    console.log(teamId, userId, "mmmd");
    const data = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_USER_ROUTE}?rejectTeamId=${teamId}&userId=${userId}`,
        {}
      )
      .catch((err) => {
        console.log("teamRejectedErr", err);
      });
    if (data) {
      console.log(data.data);
      setUserData(data.data);
    }
  };

  const teamRequestAccepted = async (teamId, userFields) => {
    const userFieldsString = stringify(userFields);
    console.log("ddd", userFieldsString);
    const formdata = new FormData();
    formdata.append("userFields", userFieldsString);
    const data = await axios
      .patch(`${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?teamId=${teamId}`, {
        userFields: userFieldsString,
      })
      .catch((err) => {
        console.log("teamAcceptErr", err);
      });
    console.log("teamAccepth", data);
    teamRequestRejected(teamId, userFields._id);
  };

  const getTeamsWithUser = async (userId) => {
    const formdata = new FormData();
    const data = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?teamMemberId=${userId}`,
        {}
      )
      .catch((err) => {
        console.log("teamMemeberIderr", err);
      });
    console.log("dataWho", data);
    if (data) {
      setAllCurrentJoinedTeam(data.data);
    }
  };

  const setCurrentJoinedTeamFunction = (teamId) => {
    console.log("based", allCurrentJoinedTeam);
    const team = allCurrentJoinedTeam.filter((item) => item._id === teamId);
    console.log(team, "fold");
    setCurrentJoinedTeam(team);
  };

  const deletePin = async ({ pinId, pinThemeName }) => {
    console.log("idddsss", currentTeam[0]._id, currentOpenRelease[0]._id);
    console.log("hh", pinId, pinThemeName);

    const formdata = new FormData();
    const newTeamAfterPinDelete = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?teamId=${
          currentTeam[0]._id
        }&releaseId=${
          currentOpenRelease[0]._id
        }&pinId=${pinId}&deletingPin=${true}`,
        {}
      )
      .catch((err) => {
        console.log("deletingPinerr", err);
      });
    console.log("Mmm", newTeamAfterPinDelete);

    if (newTeamAfterPinDelete) {
      setCurrentTeam([newTeamAfterPinDelete.data]);
      setCurrentPinsOpen((prev) => {
        const newThemeArr = prev[pinThemeName].filter((pin) => {
          return pin._id != pinId;
        });
        return { ...prev, [pinThemeName]: newThemeArr };
      });
    }
  };

  const UserStoryInteractions = async (entireObject, releaseId) => {
    console.log("dd", currentJoinedTeam[0]._id);
    const formdata = new FormData();
    formdata.append("pinInteraction", stringify(entireObject));
    const UpdatedTeamWithInteractions = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?interaction=${true}&teamId=${
          currentJoinedTeam[0]._id
        }&releaseId=${releaseId}`,
        { pinInteraction: stringify(entireObject) }
      )
      .catch((err) => {
        console.log("interactionErr", err);
      });

    if (UpdatedTeamWithInteractions) {
      console.log("mmm", UpdatedTeamWithInteractions.data);
      setCurrentJoinedTeam([UpdatedTeamWithInteractions.data]);
    }

    console.log("fij", UpdatedTeamWithInteractions);
  };

  const saveMap = async (map) => {
    const formdata = new FormData();
    formdata.append("Map", stringify(map));

    const savedMap = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?currentMapTeam=${currentTeam[0]._id}`,
        { Map: stringify(map) }
      )
      .catch((err) => {
        console.log("mapErr", err);
      });
    console.log("savedMap", savedMap);
    if (savedMap) {
      setCurrentTeam([savedMap.data]);
      return savedMap;
    }
  };

  const sendMessage = async (Object) => {
    const formdata = new FormData();
    formdata.append("Message", stringify(Object));
    let TeamId;
    if (userData.role === "TeamMember") {
      TeamId = currentJoinedTeam[0]._id;
    } else {
      TeamId = currentTeam[0]._id;
    }
    const savedTeamAfterMessage = await axios
      .patch(`${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?teamId=${TeamId}`, {
        Message: stringify(Object),
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(savedTeamAfterMessage);
    if (savedTeamAfterMessage.data) {
      setCurrentTeam([savedTeamAfterMessage.data]);
      setCurrentJoinedTeam([savedTeamAfterMessage.data]);
      setMessagesBeforeUpdate(savedTeamAfterMessage.data);
      window.localStorage.setItem(
        "chatMessages",
        stringify(savedTeamAfterMessage.data.chatHistory)
      );
    }
  };

  const setCurrentMessages = () => {
    return;
    let Team = currentTeam;
    console.log("uia", messagesBeforeUpdate, Team);

    Team[0].chatHistory = messagesBeforeUpdate;
    console.log(Team);

    setCurrentTeam(Team);
  };

  const deleteAllTeamMessages = async () => {
    const formdata = new FormData();
    const dataTobeSent = currentTeam[0];
    dataTobeSent.chatHistory.Chats = [];
    formdata.append("emptyChatTeam", stringify(dataTobeSent));
    const dataAfterDeleted = await axios
      .patch(
        `${
          process.env.NEXT_PUBLIC_API_TEAM_ROUTE
        }?deleteTeamMessages=${true}&teamId=${currentTeam[0]._id}`,
        { emptyChatTeam: stringify(dataTobeSent) }
      )
      .catch((err) => {
        console.log(err);
      });

    console.log("sss", dataAfterDeleted);
  };

  return {
    patchedMongoDbUser,
    setCurrentJoinedTeam,
    setCurrentTeam,
    messagesBeforeUpdate,
    setMessagesBeforeUpdate,
    deleteAllTeamMessages,
    setCurrentMessages,
    sendMessage,
    saveMap,
    UserStoryInteractions,
    deletePin,
    currentJoinedTeam,
    setCurrentJoinedTeamFunction,
    allCurrentJoinedTeam,
    getTeamsWithUser,
    teamRequestRejected,
    teamRequestAccepted,
    teamRequest,
    saveSprints,
    saveStories,
    currentPinsOpenRevised,
    setCurrentPinsOpenRevised,
    deleteRelease,
    addUserStory,
    deleteTeam,
    setCurrentOpenReleaseData,
    setCurrentTeamAvailable,
    CreateRelease,
    CreateTeam,
    currentOpenRelease,
    authUser,
    loading,
    CreateUserWithEmailAndPassword,
    SignInWithEmailAndPassword,
    SignOut,
    getUserData,
    userData,
    getUserTeam,
    userTeamData,
    currentTeam,
    setCurrentOpenRelease,
    setCurrentPinsOpen,
    currentPinsOpen,
    currentReleaseEpics,
    themes,
    setTheme,
  };
}
