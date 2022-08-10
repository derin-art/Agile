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

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function usefirebaseAuthState() {
  console.log("proccess", process.env.NEXT_PUBLIC_API_USER_ROUTE);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userTeamData, setUserTeamData] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentOpenRelease, setCurrentOpenRelease] = useState(null);

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const getUserData = async (email) => {
    const formdata = new FormData();
    formdata.append("email", email);
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_API_USER_ROUTE}?email=${email}`)
      .catch((err) => {
        console.log(err);
      });
    setUserData(data.data);
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
      .post(process.env.NEXT_PUBLIC_API_USER_ROUTE, formdata, config)
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
    const editedUser = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_USER_ROUTE}?email=${email}`,
        formdata,
        config
      )
      .catch((err) => {
        console.log(err);
      });
    console.log("Login details", editedUser);
    setUserData(editedUser.data);
  };

  const setCurrentTeamAvailable = (id) => {
    const current = userTeamData.filter((item) => item._id === id);
    if (current) {
      setCurrentTeam(current);
    }
  };

  const SignInWithEmailAndPassword = (email, password, role) => {
    /*  getUserData(email); */
    patchedMongoDbUser(email, role);
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

  const CreateTeam = async (name, email) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    const createdTeamData = await axios
      .post(process.env.NEXT_PUBLIC_API_TEAM_ROUTE, formdata, config)
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
      .patch(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?id=${teamId}`,
        formdata,
        config
      )
      .catch((err) => {
        console.log(err);
      });
    console.log("UpdatedTeam", updatedTeamWithRelease);
    if (updatedTeamWithRelease) {
      setCurrentTeam([updatedTeamWithRelease.data]);
    }
  };

  const CreateRelease = async (owner, teamId, name, startDate, endDate) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formdata = new FormData();
    formdata.append("owner", owner);
    formdata.append("teamId", teamId);
    formdata.append("name", name);
    formdata.append("startDate", startDate);
    formdata.append("endDate", endDate);
    const data = await axios
      .post(process.env.NEXT_PUBLIC_API_RELEASE_ROUTE, formdata, config)
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      console.log("DDD", data);
      console.log("dd", typeof data.data);
      PatchTeamWithNewRelease(teamId, data.data, config);

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

    const result = axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_TEAM_ROUTE}?teamCurrentId=${teamCurrentId}&releaseCurrentId=${releaseCurrentId}`,
        formdata,
        config
      )
      .catch((err) => console.log(err));
  };

  const addUserStory = async (
    name,
    Release,
    PriorityRank,
    AcceptanceCriteria
  ) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("Release", Release);
    formdata.append("PriorityRank", PriorityRank);
    formdata.append("AcceptanceCriteria", AcceptanceCriteria);
    const data = await axios
      .post(`${process.env.NEXT_PUBLIC_API_STORY_ROUTE}`, formdata, config)
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      console.log(data);
      addUserStoryToTeam(
        data.data,
        currentTeam[0]._id,
        currentOpenRelease[0]._id
      );
    }
  };

  const setCurrentOpenReleaseData = (id) => {
    const current = currentTeam[0].Release.filter((item) => item._id === id);
    console.log("set", current, id);
    if (current) {
      setCurrentOpenRelease(current);
    }
    console.log(
      "Auth Reke",
      currentOpenRelease,
      process.env.NEXT_PUBLIC_API_STORY_ROUTE
    );
  };

  return {
    addUserStory,
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
  };
}
