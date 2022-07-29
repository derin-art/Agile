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

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const getUserData = async () => {
    const data = await axios
      .get("http://localhost:3000/api/UserEndPoint")
      .catch((err) => {
        console.log(err);
      });
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
    formdata.append("role", role);
    formdata.append("gitHub", gitHubLink);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const createdMongoDbUser = await axios
      .post(process.env.NEXT_PUBLIC_API_USER_ROUTE, formdata, config)
      .catch((err) => {
        console.log(err);
      });
    console.log(createdMongoDbUser);
  };

  const SignInWithEmailAndPassword = (email, password) => {
    console.log(authUser, loading);
    return signInWithEmailAndPassword(auth, email, password);
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

  return {
    authUser,
    loading,
    CreateUserWithEmailAndPassword,
    SignInWithEmailAndPassword,
    SignOut,
    getUserData,
  };
}
