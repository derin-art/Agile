import { async } from "@firebase/util";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/firebaseUserContext";
import styles from "../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SmileUser from "../public/smileUser";
import CreateUser from "../public/CreateUser";
import TeamRoleIcon from "../public/TeamRole";
import stringify from "json-stringify";

export default function Home() {
  const router = useRouter();
  const {
    CreateUserWithEmailAndPassword,
    patchedMongoDbUser,
    SignInWithEmailAndPassword,
  } = useAuth();

  const [verifyPassword, setVerifyPassword] = useState("");
  const [gitHubPage, setGitHubPage] = useState("");
  const [userName, setUserName] = useState("");
  const [teamRole, setTeamRole] = useState("TeamMember");
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [signUppassword, setSignUpPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");

  const createUserRequest = async () => {
    if (!signUpEmail || !signUppassword) {
      toast.error("Invalid Password or email input", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "text-sm",
      });
      return;
    }
    if (!userName) {
      toast.error("No User Name Provided", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "text-sm",
      });
      return;
    }
    if (signUppassword != verifyPassword) {
      toast.error("Both passwords do not match", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "text-sm",
      });
      return;
    }
    CreateUserWithEmailAndPassword(
      signUpEmail,
      signUppassword,
      userName,
      gitHubPage,
      teamRole
    )
      .then((authUser) => {
        console.log("User created in firebase");
        toast.success("User Created!", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "text-sm",
        });
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("Email Already in use", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;
          default:
            toast.error("Bad connection", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
        }
      });
  };

  const loginRequest = async () => {
    if (!password || !email) {
      toast.error("Invalid Password or email input", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "text-sm",
      });
      return;
    }
    await SignInWithEmailAndPassword(email, password, teamRole)
      .then((authUser) => {
        console.log("Login successful");
        patchedMongoDbUser(email, teamRole);
        toast.success("Login Successful!", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "text-sm",
          onClose: () => {
            if (teamRole === "TeamMember") {
              router.push("/User");
            } else {
              router.push("/Teams");
            }
          },
        });
      })
      .catch((err) => {
        console.log(err.code);
        switch (err.code) {
          case "auth/user-not-found":
            toast.error("User Not found", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;
          case "auth/wrong-password":
            toast.error("Wrong Password", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;
          case "auth/invalid-email":
            toast.error("Invalid Email", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;

          default:
            toast.error("Bad Connection", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;
        }
      });
  };

  const launchTutorial = () => {
    toast.info(
      <div className="">
        Hey, welcome to the tutorial of my Agile and Scrum app. Below are two
        ways to login into the app, as a product owner and as a team member.
        Logging in as a product owner is preferable if you are first time user
        as it exposes you to most of the apps functionality. If you dont want to
        start the entire process of creating a user, you can login with the
        tutorial user <span className="font-bold">email: guy@gmail.com</span>{" "}
        and <span className="font-bold">password: password1</span>. It is
        advisable you do this for first time users.
      </div>,
      {
        autoClose: false,
        className: "text-sm",
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };
  useEffect(() => {
    launchTutorial();
  }, []);

  return (
    <div className="h-full bg-indigo-900 font-Josefin">
      <button
        className="absolute right-2 text-green-300"
        onClick={() => {
          launchTutorial();
        }}
      >
        Show Tutorial
      </button>
      <div className="flex-col flex h-full">
        <div className="flex items-center justify-center h-3/4">
          <div
            className={`flex flex-col w-fit md:p-6 md:px-14 p-2 border rounded-lg border-green-400 shadow-md shadow-indigo-800 ${
              !isLogin && "hidden"
            } items-center`}
          >
            {SmileUser("fill-green-300 mb-2", "40", "40")}
            <input
              className="border p-2 bg-indigo-900 text-green-400 w-64 border-indigo-300 placeholder:text-green-200"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            ></input>
            <input
              className="border mt-2 p-2 w-64 bg-indigo-900 text-green-400 border-indigo-300 placeholder:text-green-200"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            ></input>
            <div className="flex flex-col mt-2 w-64 sm:w-fit">
              <p className="text-xs text-green-200 text-center">
                Please Select your role for the team. Note you can change it
                later
              </p>
              <div className="flex mt-2 text-xs items-center justify-center text-indigo-300">
                <button
                  className="flex-col flex items-center mr-2"
                  onClick={() => {
                    setTeamRole("TeamMember");
                  }}
                >
                  {TeamRoleIcon(
                    "TeamMember",
                    `${
                      teamRole === "TeamMember"
                        ? "fill-green-300"
                        : "fill-indigo-300"
                    }`
                  )}
                  Team Member
                </button>
                <button
                  className="flex-col flex items-center mr-2"
                  onClick={() => {
                    setTeamRole("ProductOwner");
                  }}
                >
                  {TeamRoleIcon(
                    "ProductOwner",
                    `${
                      teamRole === "ProductOwner"
                        ? "fill-green-300"
                        : "fill-indigo-300"
                    }`
                  )}
                  Product Owner
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                loginRequest();
                if (!localStorage.getItem("enableTutorial")) {
                  localStorage.setItem("enableTutorial", stringify(true));
                }
              }}
              className="p-2 px-6 border border-green-400 text-green-300 mt-2 hover:text-green-300"
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin((prev) => !prev);
              }}
              className="text-xs mt-2 text-green-200"
            >
              Do you want to create an account?
            </button>
          </div>
          <ToastContainer></ToastContainer>
          <div
            className={`${
              isLogin && "hidden"
            } flex flex-col w-fit lg:p-6 lg:px-14 mt-10 p-2 border shadow-md shadow-indigo-800 rounded-lg border-green-400 items-center justify-center`}
          >
            {CreateUser("fill-green-300 mb-2", "40", "40")}
            <input
              className="border p-2 bg-indigo-900 text-green-400 w-64 border-indigo-300 placeholder:text-green-200 mb-2"
              placeholder="Name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            ></input>
            <input
              className="border p-2 bg-indigo-900 text-green-400 w-64 border-indigo-300 placeholder:text-green-200"
              placeholder="email"
              onChange={(e) => setSignUpEmail(e.target.value)}
              value={signUpEmail}
            ></input>
            <input
              className="border p-2 bg-indigo-900 text-green-400 w-64 border-indigo-300 placeholder:text-green-200 mt-2"
              placeholder="password"
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUppassword}
            ></input>
            <input
              className="border p-2 bg-indigo-900 text-green-400 w-64 border-indigo-300 placeholder:text-green-200 mt-2"
              placeholder="Verify password"
              onChange={(e) => setVerifyPassword(e.target.value)}
              value={verifyPassword}
            ></input>

            <input
              className="border p-2 bg-indigo-900 text-green-400 w-64 border-indigo-300 placeholder:text-green-200 mt-2"
              placeholder="GitHub Page Link-not required"
              onChange={(e) => {
                setGitHubPage(e.target.value);
              }}
              value={gitHubPage}
            ></input>

            <button
              onClick={() => {
                createUserRequest();
              }}
              className="p-2 px-6 border border-green-400 text-green-300 mt-2 hover:text-green-300"
            >
              SignUp
            </button>
            <button
              onClick={() => {
                setIsLogin((prev) => !prev);
              }}
              className="text-xs mt-2 text-green-200"
            >
              Do you have an account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/*  .catch((error) => {
          if(error.code === 'auth/wrong-password'){
            toast.error('Please check the Password');
          }
          if(error.code === 'auth/user-not-found'){
            toast.error('Please check the Email');
          }
        })*/
