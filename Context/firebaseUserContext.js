import usefirebaseAuthState from "../Hooks/firebaseAuthState";
import react, { createContext, useContext, Context, useEffect } from "react";
import axios from "axios";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  SignInWithEmailAndPassword: async () => {},
  CreateUserWithEmailAndPassword: async () => {},
  SignOut: async () => {},
});

function AuthUserProvider({ children }) {
  const auth = usefirebaseAuthState();

  useEffect(() => {
    if (auth.authUser) {
      console.log(auth.authUser);
      if (auth.authUser.email) {
        console.log(auth.authUser.email);
        if (!auth.userData) {
          auth.getUserData(auth.authUser.email);
        }
      }
    } else {
    }
  }, []);

  return (
    <authUserContext.Provider
      value={auth}
      children={children}
    ></authUserContext.Provider>
  );
}

const useAuth = () => useContext(authUserContext);

export { useAuth, AuthUserProvider };
