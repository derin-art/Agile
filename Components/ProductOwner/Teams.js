import TeamCreateIcon from "../../public/TeamCreateIcon";
import infoIcon from "../../public/infoIcon";
import { info } from "autoprefixer";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, withStyles } from "@material-ui/styles";
import Link from "next/dist/client/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../public/logo";
import teamHeadsIcon from "../../public/teamHeadsicon";
import deleteIcon from "../../public/deleteIcon";
import "react-toastify/dist/ReactToastify.css";

export default function Team({
  userData,
  CreateTeam,
  getUserTeam,
  userTeamData,
  authUser,
  setCurrentTeamAvailable,
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

  const [teamMemuOpen, setTeamMenuOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [teamSummary, setTeamSummary] = useState("");
  const [allTeams, setAllTeams] = useState([]);
  const [mobileTeamMenuOpen, setMobileTeamMenuOpen] = useState(false);

  const styles = makeStyles({
    tooltip: {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      border: ".5px solid #999999",
      fontSize: ".85rem",
      fontWeight: "400",
    },
  });

  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      color: "lightblue",
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: "1px  1px #4ade80",
      border: "1px #4ade80 solid",
      marginTop: "20px",
    },
  })(Tooltip);

  return (
    <div className="w-full h-full font-Josefin">
      <div className="lg:text-7xl md:text-5xl text-slate-300 mb-4 hidden md:block text-3xl p-2 md:p-0">
        Every great project starts with a great team...
      </div>
      <div className="md:flex-row flex hidden md:flex">
        <button
          className={`relative duration-1000 ${
            teamMemuOpen ? "my-rotate-y-180" : ""
          }`}
          onClick={() => {
            if (!teamMemuOpen) {
              setTeamMenuOpen(true);
            }
          }}
        >
          <div
            className={`border-2 p-3 bg-indigo-800 border-indigo-800 rounded-xl hover:border-green-300 ${
              teamMemuOpen && "hidden"
            }`}
          >
            <p className="text-lg text-green-300">Create A New Team</p>
            {TeamCreateIcon(true, "fill-green-300", "300", "300")}
            <BlueOnGreenTooltip
              title={
                <p className="text-sm text-indigo-800 font-Josefin">
                  Want to start a project with a different team or{" "}
                  <span className="text-green-400">New here?</span> Creating a
                  team is the first step to take.
                </p>
              }
              placement="bottom-end"
            >
              <div>{infoIcon("absolute right-2 bottom-2 fill-green-400")}</div>
            </BlueOnGreenTooltip>
          </div>

          <div
            className={`${
              !teamMemuOpen && "hidden"
            } h-[350px] w-[350px] duration-1000 rounded-xl bg-indigo-800`}
          >
            <div className="flex flex-col items-center">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Team Name"
                className="my-rotate-y-180 p-2 w-fit mt-8 border border-green-400 bg-indigo-800 text-green-400 placeholder:text-green-300"
              ></input>
              <textarea
                onChange={(e) => {
                  setTeamSummary(e.target.value);
                }}
                placeholder="Team Summary-Optional"
                className="my-rotate-y-180 p-2 w-fit mt-4 border border-green-400 bg-indigo-800 text-green-400 placeholder:text-green-300"
              ></textarea>

              <div>
                <button
                  className="border w-fit my-rotate-y-180 mt-4 p-2 bg-green-400 text-indigo-800"
                  onClick={() => {
                    setTeamMenuOpen(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="my-rotate-y-180 ml-2 p-2 border bg-green-400 text-indigo-800"
                  onClick={() => {
                    if (!name) {
                      toast.error("Name input required", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        className: "text-sm",
                      });
                      return;
                    }
                    const newTeam = CreateTeam(name, userData.email);
                    if (newTeam) {
                      toast.success(
                        "Team Created. Click the explore card to access it",
                        {
                          position: toast.POSITION.BOTTOM_CENTER,
                          className: "text-sm",
                        }
                      );
                    }
                  }}
                >
                  Create team
                </button>
              </div>
            </div>
          </div>
        </button>

        <div className="flex flex-col">
          <div
            className={`relative duration-1000 ml-4 ${
              exploreMenuOpen ? "my-rotate-y-180" : ""
            }`}
            onClick={() => {
              if (!exploreMenuOpen) {
                setExploreMenuOpen(true);
              }
              if (!exploreMenuOpen) {
                if (!userData.email) {
                  toast.warn("User data still being fetched", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: "text-sm",
                  });
                }

                if (userData) {
                  if (!userData.email) return;
                  const data = getUserTeam(userData.email);
                  console.log(data, "actual");
                }
              }
            }}
          >
            <div
              className={`border-2 p-3 border-indigo-800 bg-indigo-800 rounded-xl hover:border-green-300 ${
                exploreMenuOpen && "hidden"
              }`}
            >
              <p className="text-lg text-green-300">Explore Existing Teams</p>
              {TeamCreateIcon(false, "fill-green-300", "300", "300")}
              <BlueOnGreenTooltip
                title={
                  <p className="text-sm text-indigo-800 font-Josefin">
                    Explore and access teams you have created
                  </p>
                }
                placement="bottom-end"
              >
                <div>
                  {infoIcon("absolute right-2 bottom-2 fill-green-400")}
                </div>
              </BlueOnGreenTooltip>
            </div>
            <div
              className={`h-[350px] w-[350px] duration-1000 bg-indigo-800 rounded-xl ${
                !exploreMenuOpen && "hidden"
              }`}
            >
              <button
                className="my-rotate-y-180 border p-2 text-indigo-800 bg-green-400 rounded-tr-xl"
                onClick={() => {
                  setExploreMenuOpen((prev) => !prev);
                }}
              >
                Back
              </button>
              <div className="pt-4 relative h-[260px] overflow-auto">
                {userTeamData ? (
                  userTeamData.length ? (
                    userTeamData.map((item) => (
                      <div className="flex flex-row-reverse p-2" key={item._id}>
                        {teamHeadsIcon("fill-green-400 ml-10")}
                        <Link href={`/Teams/${item._id}`}>
                          <button
                            className="my-rotate-y-180 text-green-400"
                            onClick={() => {
                              setCurrentTeamAvailable(item._id);
                            }}
                          >
                            {item.name}
                          </button>
                        </Link>
                        {deleteIcon("fill-green-400 mr-10 absolute left-2")}
                      </div>
                    ))
                  ) : (
                    <p className="my-rotate-y-180 text-green-400">
                      No teams created yet
                    </p>
                  )
                ) : (
                  <p className="my-rotate-y-180 text-green-400">
                    No teams loaded. Please re-flip the card
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
      <div className="mt-4 p-2 md:hidden">
        <ToastContainer></ToastContainer>
        <div className="flex ">
          <button
            className="flex leading-4 p-2 border rounded-xl border-green-400"
            onClick={() => {
              setMobileTeamMenuOpen(false);
            }}
          >
            {TeamCreateIcon(true, "fill-green-400 mr-2", "30", "30")}
            Create a new Team{" "}
          </button>
          <button
            className="flex leading-4 p-2 ml-2 border rounded-xl border-green-400"
            onClick={() => {
              setMobileTeamMenuOpen(true);
              if (userData) {
                if (userData.email) {
                  const data = getUserTeam(userData.email);
                  console.log(data, "actual");
                }
              }
            }}
          >
            {TeamCreateIcon(false, "fill-green-400 mr-2", "30", "30")}
            Explore created teams{" "}
          </button>
        </div>
        <div className={`flex items-center justify-center`}>
          <div
            className={`mt-4 h-[300px] relative flex items-center justify-center w-[300px] border duration-1000 bg-indigo-800 rounded-xl border-green-400 ${
              mobileTeamMenuOpen ? "my-rotate-y-180" : ""
            }`}
          >
            {mobileTeamMenuOpen
              ? TeamCreateIcon(
                  false,
                  "fill-green-400 absolute top-4 left-2",
                  "40",
                  "40"
                )
              : TeamCreateIcon(
                  true,
                  "fill-green-400 absolute top-4 left-2",
                  "40",
                  "40"
                )}
            <div className={`p-2 ${mobileTeamMenuOpen ? "hidden" : ""}`}>
              <input
                className="border border-green-400 placeholder:text-green-400 p-2 bg-indigo-800 text-green-400"
                placeholder="Team Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <button
                className="mt-2 p-2 border bg-green-400 text-indigo-800"
                onClick={() => {
                  if (!name) {
                    toast.error("Name input required", {
                      position: toast.POSITION.TOP_CENTER,
                      className: "text-sm",
                    });
                    return;
                  }
                  const newTeam = CreateTeam(name, userData.email);
                  if (newTeam) {
                    toast.success(
                      "Team Created. Click the explore card to access it",
                      {
                        position: toast.POSITION.TOP_CENTER,
                        className: "text-sm",
                      }
                    );
                  }
                }}
              >
                Create team
              </button>
            </div>

            <div
              className={`my-rotate-y-180 relative h-[250px] w-[200px] overflow-auto mt-4 ${
                !mobileTeamMenuOpen ? "hidden" : ""
              }`}
            >
              {userTeamData ? (
                userTeamData.map((item) => (
                  <div className="flex p-2" key={item._id}>
                    {teamHeadsIcon("fill-green-400")}
                    <Link href={`/Teams/${item._id}`}>
                      <button
                        className="text-green-400"
                        onClick={() => {
                          setCurrentTeamAvailable(item._id);
                        }}
                      >
                        {item.name}
                      </button>
                    </Link>
                    {deleteIcon("fill-green-400 absolute left-32")}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  {logo("animate-spin fill-green-400", "40", "40")}
                  <p className="mt-4">loading data...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
