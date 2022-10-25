import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "../../../../../Context/firebaseUserContext";

const AblyChatComponent = dynamic(
  () => import("../../../../../Components/AlbyChatComponent"),
  { ssr: false }
);

export default function Chat() {
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
  return (
    <div className="pt-12">
      <div className="font-Josefin text-3xl border-green-400 p-2 text-gray-400 border-b mb-2">
        Chat
      </div>
      <AblyChatComponent
        setCurrentTeam={setCurrentTeam}
        messagesBeforeUpdate={messagesBeforeUpdate}
        userData={userData}
        sendMessage={sendMessage}
        key="Ablyyy"
        deleteAllTeamMessages={deleteAllTeamMessages}
        currentTeam={currentTeam}
        currentJoinedTeam={currentJoinedTeam}
      ></AblyChatComponent>
    </div>
  );
}
