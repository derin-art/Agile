import teamHeadsIcon from "../../public/teamHeadsicon";
import TeamCreateIcon from "../../public/TeamCreateIcon";

import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { async } from "@firebase/util";
import TeamLinkRender from "./TeamsLinkRender";
import CreateTeamMenu from "./CreateTeamMenu";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TutorialIcon from "../../public/TutorialIcon";
import { AnimatePresence } from "framer-motion";

export default function TeamsCard({
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
  const [name, setName] = useState("");
  const [teamSummary, setTeamSummary] = useState("");
  const [stateTeamData, setStateTeamData] = useState(null);
  const [isDataMenuOpen, setDataMenuOpen] = useState(false);
  const [createTeamMenu, setCreateTeamMenu] = useState(false);

  const compassIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="120"
      height="120"
      className="fill-indigo-900"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm4.5-12.5L14 14l-6.5 2.5L10 10l6.5-2.5zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
  );

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

  const variants = {
    out: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.5,
      },
    },
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const menuOpenFunction = () => {
    setDataMenuOpen((prev) => !prev);
    if (!isDataMenuOpen) {
      fetchTeamFunction();
    }
  };

  return (
    <div className="w-full h-screen font-Josefin">
      <ToastContainer></ToastContainer>
      <div className="flex h-full w-full justify-center">
        <div className="w-2/5 h-96 bg-indigo-800 lg:mr-32 xl:mr-40 mr-8 hover:shadow-lg rounded-2xl p-4 duration-300 hover:shadow-indigo-800/50">
          <div className="w-full">
            <div className="text-white md:text-4xl lg:text-5xl xl:text-7xl relative w-full text-left">
              {!isDataMenuOpen ? (
                <button
                  onClick={() => {
                    menuOpenFunction();
                  }}
                  className="hover:text-green-200 duration-300"
                >
                  Explore Teams
                </button>
              ) : (
                <div className="relative w-full">
                  Your Teams
                  <button
                    onClick={() => {
                      menuOpenFunction();
                    }}
                    className="absolute right-0 text-2xl mt-0 bottom-0 text-green-300"
                  >
                    ‹‹ More Info
                  </button>
                </div>
              )}
            </div>
            <div className="w-full h-full">
              <AnimatePresence>
                <motion.div
                  key={isDataMenuOpen}
                  variants={variants}
                  animate="in"
                  initial="out"
                  exit={"out"}
                  className="w-full h-full"
                >
                  {!isDataMenuOpen ? (
                    <div className="relative w-full">
                      <div className="absolute top-0 w-full">
                        {compassIcon}
                        <div className="flex relative w-full">
                          <div className="text-lg shadow-green-300/50 shadow absolute right-0 text-white lg:w-1/4 md:w-2/4 border top-0 p-2 xl:p-4 rounded-2xl border-green-300 border-2 lg:min-w-[200px] xl:min-w-[200px]">
                            Explore the teams you have created previously.
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 w-full h-full p-2">
                        <TeamLinkRender
                          userTeamData={userTeamData}
                          deleteTeam={deleteTeam}
                          stateTeamData={stateTeamData}
                          key={"teamRenderLink"}
                          setCurrentTeamAvailable={setCurrentTeamAvailable}
                          setMessagesBeforeUpdate={setMessagesBeforeUpdate}
                        ></TeamLinkRender>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="w-2/6 lg:h-5/6 md:h-4/6 flex-col flex p-2 pt-0">
          <div className="w-full h-2/4 bg-indigo-800 rounded-2xl p-4">
            <div className="w-full h-full relative">
              <AnimatePresence>
                <motion.div
                  key={createTeamMenu}
                  variants={variants}
                  animate="in"
                  initial="out"
                  exit={"out"}
                  className="w-full h-full absolute top-0"
                >
                  {!createTeamMenu ? (
                    <div className="text-white md:text-4xl xl:text-7xl  h-full w-full">
                      <div className="">
                        <button
                          onClick={() => {
                            setCreateTeamMenu((prev) => !prev);
                          }}
                          className="hover:text-green-300 duration-200"
                        >
                          Create Team
                        </button>
                        <div>
                          {TeamCreateIcon(
                            true,
                            "fill-indigo-900",
                            "120",
                            "120"
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 h-full w-full">
                      <div className="relative">
                        <button
                          className="absolute right-0 text-white p-2 bg-red-500"
                          onClick={() => {
                            setCreateTeamMenu((prev) => !prev);
                          }}
                        >
                          X
                        </button>
                        <CreateTeamMenu
                          createNewTeam={createNewTeam}
                          key={"CreateTeamMenu"}
                          setTeamSummary={setTeamSummary}
                          setName={setName}
                        ></CreateTeamMenu>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full h-2/4 bg-indigo-800 border lg:mt-8 mt-4 rounded-2xl p-4">
            <div className="text-white md:text-4xl xl:text-7xl ">
              Read About
            </div>
            {TutorialIcon("fill-indigo-900", "120", "120")}
          </div>
        </div>
      </div>
    </div>
  );
}
