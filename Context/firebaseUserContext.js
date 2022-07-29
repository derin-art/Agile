import usefirebaseAuthState from "../Hooks/firebaseAuthState";
import react, { createContext, useContext, Context } from "react";
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
  react.useEffect(() => {
    const getUsers = async () => {
      const data = await axios.get("localhost:3000/api/UserEndPoint");
    };
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
