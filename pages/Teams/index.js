import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import usefirebaseAuthState from "../../Hooks/firebaseAuthState";
import { useAuth } from "../../Context/firebaseUserContext";
import axios from "axios";
import UserStory from "../../Components/ProductOwner/UserStory";
import Team from "../../Components/ProductOwner/Teams";
import { io } from "socket.io-client";
let socket;

export default function Newpage({ finalData }) {
  const router = useRouter();
  const {
    authUser,
    loading,
    getUserData,
    SignOut,
    userData,
    CreateTeam,
    getUserTeam,
    userTeamData,
    setCurrentTeamAvailable,
    setMessagesBeforeUpdate,
    currentTeam,
    messagesBeforeUpdate,
    deleteTeam,
  } = useAuth();
  useEffect(() => {
    console.log(authUser, loading, "NewPage");
    if (!authUser) {
      router.push("/");
    }
    console.log("index data", userData);
  }, [authUser, loading]);

  useEffect(() => {
    socket = io();
  }, []);
  const [roomInput, setRoomInput] = useState("");
  const [typedInput, setTypedInput] = useState("");

  const getAllUsers = async () => {
    const data = await axios.get("../api/UserEndPoint").catch((err) => {
      console.log(err);
    });
    console.log(data);
  };

  const socketIntiallizer = async () => {
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

  return (
    <div className="">
      <div className="mt-20 md:ml-4">
        <Team
          messagesBeforeUpdate={messagesBeforeUpdate}
          setMessagesBeforeUpdate={setMessagesBeforeUpdate}
          userData={userData}
          CreateTeam={CreateTeam}
          getUserTeam={getUserTeam}
          userTeamData={userTeamData}
          authUser={authUser}
          setCurrentTeamAvailable={setCurrentTeamAvailable}
          deleteTeam={deleteTeam}
        ></Team>
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

/*  <h1>
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
