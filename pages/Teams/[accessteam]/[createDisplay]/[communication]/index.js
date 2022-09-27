import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { toast, ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import axios from "axios";
import addIcon from "../../../../../public/addIcon";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../../../Context/firebaseUserContext";

let socket;

/* (email, teamId, teamName, fromEmail) */

export default function Communication() {
  const { teamRequest, userData, currentTeam } = useAuth();
  console.log("pretty important", teamRequest, userData, currentTeam);
  const [roomInput, setRoomInput] = useState("");
  const [chats, setChats] = useState([]);
  console.log(chats, "chatsDatat");
  socket = io();

  const socketIntiallizer = async () => {
    await fetch("../../../../api/Socket").catch((err) => {
      console.log("SocketErr", err);
    });
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("joinedroom", () => {
      console.log("Joined room");
    });
    socket.on("recieveMessage", (msg) => {
      setChats((prev) => [...prev, <p>{msg}</p>]);
      console.log(msg, "sent sjsj");
    });
    socket.emit("join", "room1");
  };
  useEffect(() => {
    socketIntiallizer();
  }, []);
  const [emailSearch, setEmailSearch] = useState("");
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  return (
    <div className="flex w-10/11 h-screen overflow-x-hidden relative">
      <ToastContainer></ToastContainer>
      <button
        onClick={() => {
          setTeamMenuOpen((prev) => !prev);
        }}
        className="absolute right-5 top-16 z-50 font-Josefin border text-sm p-1 flex items-center"
      >
        Team Add
        {addIcon("ml-2")}
      </button>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="h-3/4 w-3/4 bg-white rounded-lg border bg-gray-100 relative">
          {" "}
          {chats}
          <div className="w-full flex items-center justify-center absolute bottom-0">
            <textarea
              className="w-3/4 border max-h-[60px]"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            <button
              onClick={() => {
                socket.emit("roomMessage", message);
              }}
              className=" border p-3 font-Josefin py-[17px]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div
        className={`bg-green-100 h-full w-[360px] duration-300 z-30 ${
          teamMenuOpen ? "translate-x-0" : "translate-x-96"
        }`}
      >
        <div className="flex flex-col mt-20 p-1 font-Josefin">
          <div className="text-lg border-b">Add To Your Team</div>
          <div className="text-xs mb-4">Send a team request to a user </div>
          <input
            onChange={(e) => {
              setEmailSearch(e.target.value);
            }}
            placeholder="Email"
            className="border p-1"
          ></input>
          <button
            className="border p-2"
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
                return (
                  <div className="mb-2 flex mt-2 relative">
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-500">{item.email}</p>
                      <p className="font-bold">{item.name}</p>
                    </div>
                    <button
                      className="text-sm p-1 border absolute right-0"
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
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* export async function getStaticProps() {
  const data = await fetch("http://localhost:3000/api/handler").catch((err) => {
    console.log(err);
  });
  const finalData = await data.json();
  console.log(finalData);
  return {
    props: {
      finalData,
    },
  };
} */

/*   const socketIntiallizer = async () => {
    await fetch("./api/Socket");
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("update-input", (msg) => {
      setTypedInput(msg);
    });
    socket.on("joinedroom", () => {
      console.log("Joined room");
    });
    socket.on("sendMembers", (msg) => {
      setRoomInput(msg);
    });
  };
  useEffect(() => {
    socketIntiallizer();
  }, []);

  const onChangeHandler = async (value) => {
    setTypedInput(value);
    console.log("valuechanged", value);
    socket.emit("input-change", value);
  };



<h1>
        Newpage
        <Link href="/">
          <button>Home</button>
        </Link>
        <input
          onChange={(e) => {
            onChangeHandler(e.target.value);
          }}
          value={typedInput}
        ></input>
        <button
          onClick={() => {
            socket.emit("join", "room1");
            console.log("join room emitted");
          }}
        >
          Create New Room
        </button>
        <button>Join created room</button>
        <input
          placeholder="room data"
          onChange={(e) => {
            setRoomInput(e.target.value);
          }}
          value={roomInput}
        ></input>
        <button
          onClick={() => {
            socket.emit("roomMessage", roomInput);
          }}
        >
          Send
        </button>
      </h1> */
