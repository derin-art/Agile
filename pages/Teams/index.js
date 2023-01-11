import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import usefirebaseAuthState from "../../Hooks/firebaseAuthState";
import { useAuth } from "../../Context/firebaseUserContext";

import Team from "../../Components/ProductOwner/Teams";

import TeamsCard from "../../Components/ProductOwner/TeamsCards";
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

  const onChangeHandler = async (value) => {
    setTypedInput(value);
    console.log("valuechanged", value);
    socket.emit("input-change", value);
  };

  return (
    <div className="">
      <div className="mt-20 md:ml-4">
        <TeamsCard
          messagesBeforeUpdate={messagesBeforeUpdate}
          setMessagesBeforeUpdate={setMessagesBeforeUpdate}
          userData={userData}
          CreateTeam={CreateTeam}
          getUserTeam={getUserTeam}
          userTeamData={userTeamData}
          authUser={authUser}
          setCurrentTeamAvailable={setCurrentTeamAvailable}
          deleteTeam={deleteTeam}
        ></TeamsCard>
        <div className="lg:hidden p-2 font-Josefin">
          Please switch to a bigger screen to use this app
          {/*  <Team
            messagesBeforeUpdate={messagesBeforeUpdate}
            setMessagesBeforeUpdate={setMessagesBeforeUpdate}
            userData={userData}
            CreateTeam={CreateTeam}
            getUserTeam={getUserTeam}
            userTeamData={userTeamData}
            authUser={authUser}
            setCurrentTeamAvailable={setCurrentTeamAvailable}
            deleteTeam={deleteTeam}
          ></Team> */}
        </div>
      </div>
    </div>
  );
}
