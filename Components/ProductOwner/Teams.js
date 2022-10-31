import TeamCreateIcon from "../../public/TeamCreateIcon";
import infoIcon from "../../public/infoIcon";

import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TutorialIcon from "../../public/TutorialIcon";

import logo from "../../public/logo";
import teamHeadsIcon from "../../public/teamHeadsicon";
import deleteIcon from "../../public/deleteIcon";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { async } from "@firebase/util";
import stringify from "json-stringify";
import parseJson from "parse-json";

export default function Team({
  deleteTeam,
  userData,
  CreateTeam,
  getUserTeam,
  userTeamData,
  authUser,
  setCurrentTeamAvailable,
  setMessagesBeforeUpdate,
  messagesBeforeUpdate,
}) {
  /*  const whiteToolKit = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#ffffff",
      color: "white",
      maxWidth: 220,
      border: "1px solid #dadde9",
    },
    arrow: {
      color: "#f5f5f9",
    },
  }))(Tooltip); */

  const [createTeamMenu, setCreateTeamMenu] = useState(false);
  const [isDataMenuOpen, setDataMenuOpen] = useState(false);
  const [teamMemuOpen, setTeamMenuOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [teamSummary, setTeamSummary] = useState("");
  const [allTeams, setAllTeams] = useState([]);
  const [mobileTeamMenuOpen, setMobileTeamMenuOpen] = useState(false);
  const [stateTeamData, setStateTeamData] = useState(null);

  const fetchTeamFunction = async () => {
    setStateTeamData(null);
    console.log("mmm", userData);
    if (userData === null) {
      toast.error("User data unavailable due to poor internet connection", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "text-sm",
      });
      return;
    }
    if (!userData.email) {
      console.log("warn");
      toast.warn("User data still being fetched", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "text-sm",
      });
    }
    if (userData) {
      if (!userData.email) return;
      const data = await getUserTeam(userData.email);
      console.log("actual", data);
      setStateTeamData(data);
    }
  };

  const createNewTeam = async () => {
    if (!name) {
      toast.error("Name input required", {
        position: toast.POSITION.TOP_CENTER,
        className: "text-sm",
      });
      return;
    }
    const newTeam = CreateTeam(name, userData.email, teamSummary);
    if (newTeam) {
      toast.success("Team Created. Click Explore Teams to access it", {
        position: toast.POSITION.TOP_CENTER,
        className: "text-sm",
      });
    }
  };

  const launchTutorial = () => {
    toast.info(
      <div>
        Welcome to the team menu. A team represents the foundation this app,
        teams comprise of a data that can be manipulated and shared with your
        team members as the product owner. If you are logged in through the
        tutorial account there is an already tutorial team existing for you be
        explore.
      </div>,
      {
        autoClose: false,
        className: "text-sm",
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };

  useEffect(() => {
    parseJson(localStorage.getItem("enableTutorial")) && launchTutorial();
  }, []);

  return (
    <div className="w-full h-full font-Josefin">
      <ToastContainer></ToastContainer>
      <div className="lg:text-4xl relative md:text-2xl text-slate-300 mb-4 text-3xl p-2 md:p-0 border-b border-green-400">
        Teams
        <motion.button
          onClick={() => {
            setName("");
            setTeamSummary("");
            setCreateTeamMenu((prev) => !prev);
          }}
          className="p-2 bg-indigo-800 z-50 duration-300 hover:bg-indigo-900 rounded px-4 absolute right-4 top-0 text-sm text-white"
        >
          Add Team
        </motion.button>
        <button
          onClick={() => {
            launchTutorial();
          }}
          className="absolute right-32 top-1 p-1 text-white rounded text-sm  bg-indigo-800 flex items-center justify-center"
        >
          Read Tutorial {TutorialIcon("fill-white")}
        </button>
        <motion.div
          initial={{ opacity: 0 }}
          animate={createTeamMenu ? { translateY: 20, opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className={`p-4 rounded-2xl text-sm h-fit w-fit mt-4 z-50 text-gray-800 bg-white shadow absolute right-4 top-4  ${
            createTeamMenu ? "" : "hidden"
          } `}
        >
          <div className="flex-col flex">
            <div className="mb-3 p-1 text-indigo-800">Create A New Team</div>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="px-4 p-1 mb-2 border rounded w-64"
              placeholder="Team Name"
            ></input>
            <textarea
              onChange={(e) => {
                setTeamSummary(e.target.value);
              }}
              className="px-4 p-1 mb-2 border rounded w-64"
              placeholder="Team Description"
            ></textarea>
          </div>
          <button
            onClick={() => {
              createNewTeam();
            }}
            className="px-4 p-2 bg-indigo-800 text-white rounded w-full hover:bg-indigo-900"
          >
            Create Team
          </button>
        </motion.div>
      </div>

      <div className="p-4">
        <motion.div
          animate={isDataMenuOpen ? { height: 350 } : { height: 60 }}
          transition={{ duration: 0.4 }}
          className="p-4 bg-indigo-800 rounded-2xl text-white border-r-8 border-green-300"
        >
          <div>
            <button
              onClick={() => {
                setDataMenuOpen((prev) => !prev);
                if (!isDataMenuOpen) {
                  fetchTeamFunction();
                }
              }}
              className={`${
                isDataMenuOpen ? "hover:text-red-300" : "hover:text-green-300"
              } duration-300`}
            >
              {isDataMenuOpen ? "Close" : "  Click To Explore Teams"}
            </button>
            <div className="flex flex-col justify-center items-center">
              <div
                className={`${isDataMenuOpen ? "" : "hidden"} text-3xl w-full`}
              >
                {stateTeamData ? (
                  stateTeamData.length > 0 ? (
                    <div className="w-full flex-col flex">
                      {userTeamData.map((item) => (
                        <div
                          className="flex text-sm mt-4 w-full relative z-10 border-b border-indigo-700"
                          key={item._id}
                        >
                          <Link href={`/Teams/${item._id}`}>
                            <button
                              className="text-white mr-4"
                              onClick={() => {
                                setCurrentTeamAvailable(item._id);
                                setMessagesBeforeUpdate(item);
                                window.localStorage.setItem(
                                  "chatMessages",
                                  stringify(item.chatHistory)
                                );
                              }}
                            >
                              {item.name}
                            </button>
                          </Link>

                          <button
                            id={item._id}
                            className="absolute right-4 -mt-1 z-10"
                            onClick={(e) => {
                              toast.info("delete disabled for demo", {
                                className: "text-sm",
                              });
                              return;
                              deleteTeam(e.target.id);
                            }}
                          >
                            {deleteIcon(
                              "fill-red-400",
                              "24",
                              "24",
                              item._id,
                              deleteTeam
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No Teams Created</p>
                  )
                ) : (
                  logo("animate-spin fill-white", "50", "50")
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
