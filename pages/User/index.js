import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { useAuth } from "../../Context/firebaseUserContext";
import { motion } from "framer-motion";
import logo from "../../public/logo";
import Link from "next/dist/client/link";

let socket;

export default function User() {
  useEffect(() => {
    socket = io();
  }, []);

  const {
    userData,
    teamRequestRejected,
    teamRequestAccepted,
    getTeamsWithUser,
    allCurrentJoinedTeam,
    setCurrentJoinedTeamFunction,
  } = useAuth();

  console.log("userData", userData);

  const [teamRequestMenu, setTeamRequestMenu] = useState(false);
  const [openTeamMenu, setOpenTeamMenu] = useState(false);

  const [message, setMessage] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const socketIntiallizer = async () => {
    await fetch("../api/Socket").catch((err) => {
      console.log("SocketErr", err);
    });
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("joinedroom", () => {
      console.log("Joined room");
    });
    socket.on("recieveMessage", (msg) => {
      setRoomInput(msg);
    });
  };
  useEffect(() => {
    socketIntiallizer();
    socket.emit("join", "room1");
  }, []);

  const bellIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className="fill-indigo-800"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M20 18.667l.4.533a.5.5 0 0 1-.4.8H4a.5.5 0 0 1-.4-.8l.4-.533V10a8 8 0 1 1 16 0v8.667zM9.5 21h5a2.5 2.5 0 1 1-5 0z" />
    </svg>
  );

  return (
    <div className="h-screen w-full relative overflow-x-hidden">
      <div
        className={`h-full w-40 md:w-64 shadow-lg border-l bg-white absolute -right-40 md:-right-64 -top-0 z-30 duration-300 ${
          teamRequestMenu
            ? "-translate-x-40 md:-translate-x-64"
            : "translate-x-0"
        }`}
      >
        <div className="mt-32">
          {userData &&
            userData.teamRequests.map((item) => {
              console.log("mafwend", item.teamName);
              return (
                <div className="font-Josefin p-1 w-full relative text-sm">
                  <div className="w-24 truncate">
                    {item.teamName}
                    <div className="text-xs text-gray-600  w-16 md:w-24 truncate">
                      {item.fromEmail}
                    </div>
                  </div>
                  <div className="absolute right-2 top-1 ">
                    <button
                      onClick={() => {
                        teamRequestAccepted(item.teamId, userData);
                      }}
                      className="border p-1 h-8 w-8 rounded bg-green-300 text-white"
                    >
                      Y
                    </button>
                    <button
                      className="border ml-2 p-1 h-8 rounded w-8 bg-red-500 text-white"
                      onClick={() => {
                        teamRequestRejected(item.teamId, userData._id);
                      }}
                    >
                      N
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div
        onClick={() => {
          setTeamRequestMenu((prev) => !prev);
        }}
        className="absolute top-14 z-50 right-6 font-Josefin text-xs rounded-2xl p-2 border flex flex-col items-center justify-center"
      >
        <div className="flex">
          <p className="text-green-500">
            {" "}
            {userData ? userData.teamRequests.length : "Unavailable"}
          </p>
          {bellIcon}
        </div>{" "}
        Team Requests
      </div>
      <div className="mt-24 font-Josefin p-2 text-2xl ml-1">
        Hi {userData ? userData.name : "Data Unavailable"}
      </div>
      <div className="w-full items-center justify-center">
        <motion.div
          animate={openTeamMenu ? { height: 350 } : { height: 40 }}
          transition={{ duration: 0.4 }}
          className={`w-9/12 bg-indigo-800 text-white ml-2 p-2 font-Josefin rounded-2xl `}
          onClick={() => {
            if (!userData) return;
            getTeamsWithUser(userData._id);
          }}
        >
          <button
            onClick={() => {
              setOpenTeamMenu((prev) => !prev);
            }}
          >
            {openTeamMenu ? (
              <p className="text-red-500">Close</p>
            ) : (
              <p>Explore Your Teams</p>
            )}
          </button>
          <div className={`${openTeamMenu ? "" : "hidden"} mt-2`}>
            {allCurrentJoinedTeam ? (
              allCurrentJoinedTeam.length > 0 ? (
                allCurrentJoinedTeam.map((item) => {
                  return (
                    <Link href="User/UserTeam" key={item._id}>
                      <button
                        onClick={() => {
                          setCurrentJoinedTeamFunction(item._id);
                        }}
                      >
                        {" "}
                        {item.name}
                      </button>
                    </Link>
                  );
                })
              ) : (
                <p>No teams created</p>
              )
            ) : (
              logo("animate-spin fill-white", "50", "50")
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
