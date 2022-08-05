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

  const CreateRelease = async (owner, teamId, name) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formdata = new FormData();
    formdata.append("owner", owner);
    formdata.append("teamId", teamId);
    formdata.append("name", name);
    const data = await axios
      .post(NEXT_PUBLIC_API_RELEASE_ROUTE, formdata, config)
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      console.log(data);
      return data.data;
    }
  };

  return {
    setCurrentTeamAvailable,
    CreateRelease,
    CreateTeam,
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