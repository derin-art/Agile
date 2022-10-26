import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import addIcon from "../../../../../public/addIcon";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../../../Context/firebaseUserContext";

export default function Communication() {
  const purgeCSSSucksBorder = () => {
    return (
      <div>
        <div className="border-gray-100"></div>
        <div className="border-gray-200"></div>
        <div className="border-gray-300"></div>
        <div className="border-gray-400"></div>
        <div className="border-gray-500"></div>
        <div className="border-gray-600"></div>
        <div className="border-gray-700"></div>
        <div className="border-gray-800"></div>
        <div className="border-orange-100"></div>
        <div className="border-orange-200"></div>
        <div className="border-orange-300"></div>
        <div className="border-orange-400"></div>
        <div className="border-orange-500"></div>
        <div className="border-orange-600"></div>
        <div className="border-orange-700"></div>
        <div className="border-orange-800"></div>
        <div className="border-indigo-100"></div>
        <div className="border-indigo-200"></div>
        <div className="border-indigo-300"></div>
        <div className="border-indigo-400"></div>
        <div className="border-indigo-500"></div>
        <div className="border-indigo-600"></div>
        <div className="border-indigo-700"></div>
        <div className="border-indigo-800"></div>
        <div className="border-green-100"></div>
        <div className="border-green-200"></div>
        <div className="border-green-300"></div>
        <div className="border-green-400"></div>
        <div className="border-green-500"></div>
        <div className="border-green-600"></div>
        <div className="border-green-700"></div>
        <div className="border-green-800"></div>
        <div className="border-red-100"></div>
        <div className="border-red-200"></div>
        <div className="border-red-300"></div>
        <div className="border-red-400"></div>
        <div className="border-red-500"></div>
        <div className="border-red-600"></div>
        <div className="border-red-700"></div>
        <div className="border-red-800"></div>
        <div className="border-blue-100"></div>
        <div className="border-blue-200"></div>
        <div className="border-blue-300"></div>
        <div className="border-blue-400"></div>
        <div className="border-blue-500"></div>
        <div className="border-blue-600"></div>
        <div className="border-blue-700"></div>
        <div className="border-blue-800"></div>
        <div className="border-yellow-100"></div>
        <div className="border-yellow-200"></div>
        <div className="border-yellow-300"></div>
        <div className="border-yellow-400"></div>
        <div className="border-yellow-500"></div>
        <div className="border-yellow-600"></div>
        <div className="border-yellow-700"></div>
        <div className="border-yellow-800"></div>
        <div className="border-purple-100"></div>
        <div className="border-purple-200"></div>
        <div className="border-purple-300"></div>
        <div className="border-purple-400"></div>
        <div className="border-purple-500"></div>
        <div className="border-purple-600"></div>
        <div className="border-purple-700"></div>
        <div className="border-purple-800"></div>
      </div>
    );
  };
  const {
    teamRequest,
    userData,
    currentTeam,
    setCurrentTeam,
    sendMessage,
    currentJoinedTeam,
    messagesBeforeUpdate,
    deleteAllTeamMessages,
  } = useAuth();

  const [emailSearch, setEmailSearch] = useState("");
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState("User");
  const [kanBamData, setKanBamData] = useState(null);

  const KanBamOtherData = [];

  const kanBamFunction = () => {
    Object.entries(currentTeam[0].teamData.sprints).forEach((item) => {
      if (currentTeam[0].Release.find((release) => release._id === item[0])) {
        item[1].sprints.forEach((sprint) => {
          sprint.stories.forEach((pin) => {
            KanBamOtherData.push({ ...pin, sprintName: sprint.name });
          });
        });

        item[1].unSelected.forEach((pin) => {
          KanBamOtherData.push({ ...pin, sprintName: "No Sprint" });
        });
      }
    });
    setKanBamData(KanBamOtherData);
  };

  useEffect(() => {
    currentTeam && kanBamFunction();
    toast.info(
      "Login with any of these email as Team members in the login page, to access the app's team member functionalities. They all share the same password. The password is `password1` ",
      {
        className: "text-sm",
        autoClose: false,
      }
    );
  }, []);

  const DumpStory = ({
    name,
    theme,
    sprintName,
    storyPoints,
    AssignedTo,
    priorityRank,
    showAssigned = false,
  }) => {
    let ValRank = "";
    if (priorityRank === "red") {
      ValRank = "high risk, low value";
    }
    if (priorityRank === "green") {
      ValRank = "low risk, high value";
    }
    if (priorityRank === "orange") {
      ValRank = "low risk, low value";
    }
    if (priorityRank === "yellow") {
      ValRank = "high risk, high value";
    }
    return (
      <div
        className={`h-24 lg:w-32 w-28 bg-indigo-800 text-white rounded p-1 border-t-8 border-${
          theme.color === "indigo" ? "green-300" : theme.color
        }`}
      >
        <div className="flex relative">
          {name} <div className="absolute right-1">{storyPoints} points</div>
        </div>
        <div>
          {sprintName === "No Sprint" ? `No Sprint` : `Sprint ${sprintName}`}
        </div>
        <div className="text-xs text-indigo-400">{ValRank}</div>
        {showAssigned && (
          <div className="flex text-sm w-24 overflow-x-auto -mt-1">
            {Array.isArray(AssignedTo)
              ? AssignedTo.map((user) => (
                  <div className="mr-1" key={user.email}>
                    {user.name},
                  </div>
                ))
              : ""}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex lg:w-10/11 w-full h-screen overflow-x-hidden relative">
      <ToastContainer></ToastContainer>
      <button
        onClick={() => {
          setTeamMenuOpen((prev) => !prev);
        }}
        className={`absolute right-5 top-12 duration-300 rounded ${
          teamMenuOpen ? "bg-red-500" : "bg-indigo-800"
        } text-white mt-2 hidden lg:flex z-50 font-Josefin border text-sm p-1 flex items-center`}
      >
        {teamMenuOpen ? "Close" : "Team Add"}
        {addIcon(
          `${teamMenuOpen ? "rotate-45" : ""} ml-2 fill-white duration-300`
        )}
      </button>
      <div className="h-full w-full flex flex-col  justify-center">
        <div className="h-full w-screen  lg:w-full z-10 border bg-gray-100 relative">
          {" "}
          <div className="mt-12 z-10 flex font-Josefin w-full bg-indigo-900 text-green-400 p-2">
            <button
              onClick={() => {
                setShowMenu("User");
              }}
              className="border-r px-1 hover:text-green-600 duration-300"
            >
              Team
            </button>
            <button
              onClick={() => {
                setShowMenu("KanBam");
              }}
              className="ml-1 border-r px-1 hover:text-green-600 duration-300"
            >
              KanBam Board
            </button>
          </div>
          <div className={`ml-2 ${showMenu === "User" ? "" : "hidden"}`}>
            <div className="mt-2 border-green-400 mb-2 font-Josefin border-b uppercase text-lg text-gray-500">
              Team
            </div>
            {currentTeam &&
              currentTeam[0].members.map((item) => {
                return (
                  <div
                    key={item.email}
                    className="flex font-Josefin border-b bg-gray-200 mb-1 pl-2 rounded-l"
                  >
                    <div className=" flex flex-col w-8 mr-2 h-8 mt-2 p-1 items-center justify-center bg-indigo-900 text-green-400 uppercase rounded-full pt-1 font-mono">
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="text-lg capitalize text-gray-600">
                        {item.name}
                      </div>
                      <div className="text-gray-400">{item.email}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={`${showMenu === "KanBam" ? "" : "hidden"}`}>
            <div className="p-1 px-2 border-green-400 border-b font-Josefin uppercase text-lg text-gray-500">
              KanBam Board
            </div>
            <div className="flex font-Josefin ">
              <div className="p-1 ">
                <div className="ml-1">Not Started</div>
                <div className="max-h-80 overflow-y-auto overflow-x-hidden w-full lg:p-1">
                  {kanBamData &&
                    kanBamData.map((item) => {
                      if (!item.completed && !item.inProgress) {
                        return (
                          <div key={item._id} className="mb-2">
                            <DumpStory
                              AssignedTo={item.AssignedTo}
                              name={item.name}
                              sprintName={item.sprintName}
                              storyPoints={item.storyPoints}
                              theme={item.theme}
                              key={item._id}
                              priorityRank={item.PriorityRank}
                            ></DumpStory>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              <div className="lg:p-1">
                <div className="ml-1">In Progress</div>
                <div className="max-h-80 overflow-y-auto overflow-x-hidden w-full p-1">
                  {kanBamData &&
                    kanBamData.map((item) => {
                      if (!item.completed && item.inProgress) {
                        return (
                          <div className="mb-2" key={item._id}>
                            <DumpStory
                              AssignedTo={item.AssignedTo}
                              name={item.name}
                              sprintName={item.sprintName}
                              storyPoints={item.storyPoints}
                              theme={item.theme}
                              key={item._id}
                              priorityRank={item.PriorityRank}
                              showAssigned={true}
                            ></DumpStory>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              <div className="lg:p-1">
                <div className="ml-1">Completed</div>

                <div className="max-h-80 overflow-y-auto overflow-x-hidden w-full p-1">
                  {kanBamData &&
                    kanBamData.map((item) => {
                      if (item.completed && item.inProgress) {
                        return (
                          <div className="mb-2" key={item._id}>
                            <DumpStory
                              AssignedTo={item.AssignedTo}
                              name={item.name}
                              sprintName={item.sprintName}
                              storyPoints={item.storyPoints}
                              theme={item.theme}
                              key={item._id}
                              priorityRank={item.PriorityRank}
                              showAssigned={true}
                            ></DumpStory>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-white shadow-lg h-full w-[360px] duration-300 z-30 ${
          teamMenuOpen ? "translate-x-0" : "translate-x-96"
        }`}
      >
        {currentTeam && (
          <div className="flex flex-col mt-20 p-1 font-Josefin">
            <div className="text-lg border-b text-gray-500 border-green-400">
              Add A User Your Team
            </div>
            <div className="text-xs mb-4">Send a team request to a user </div>
            <input
              onChange={(e) => {
                setEmailSearch(e.target.value);
              }}
              placeholder="Name"
              className="border p-1 mt-2 mb-2 rounded"
            ></input>
            <button
              className="border p-2 bg-indigo-800 text-white rounded"
              onClick={async () => {
                const data = await axios
                  .get(
                    `${process.env.NEXT_PUBLIC_API_USER_ROUTE}?userName=${emailSearch}`
                  )
                  .catch((err) => {
                    console.log(err);
                  });
                console.log("searchData", data);
                setAllUsers(data.data);
                if (data.data.length === 0) {
                  toast.warn("No user for your search field found", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: "text-sm",
                  });
                }
              }}
            >
              Search
            </button>
            <div className="max-h-[400px] overflow-y-auto">
              {" "}
              {allUsers.length > 0 &&
                allUsers.map((item) => {
                  if (
                    currentTeam[0].members.find(
                      (member) => member.email === item.email
                    )
                  ) {
                    return (
                      <div
                        key={item.email}
                        className={`${
                          userData.email === item.email ? "hidden" : ""
                        } mb-2 flex mt-2 relative bg-gray-100 p-1 rounded`}
                      >
                        <div className="flex flex-col">
                          <p className="text-xs text-gray-500">{item.email}</p>
                          <p className="font-bold">{item.name}</p>
                        </div>
                        <div className="text-sm p-1  absolute right-0  text-gray-700 rounded">
                          Already in Team
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.email}
                        className={`${
                          userData.email === item.email ? "hidden" : ""
                        } mb-2 flex mt-2 relative bg-gray-100 p-1 rounded`}
                      >
                        <div className="flex flex-col">
                          <p className="text-xs text-gray-500">{item.email}</p>
                          <p className="font-bold">{item.name}</p>
                        </div>
                        <button
                          className="text-sm p-1 border absolute right-0 bg-indigo-800 text-white rounded"
                          onClick={() => {
                            teamRequest(
                              item.email,
                              currentTeam[0]._id,
                              currentTeam[0].name,
                              userData.email
                            );
                          }}
                        >
                          Team Request
                        </button>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
