import dynamic from "next/dynamic";
import { useAuth } from "../../Context/firebaseUserContext";

const AblyChatComponent = dynamic(
  () => import("../../Components/AlbyChatComponent"),
  { ssr: false }
);

export default function UserCommunication() {
  const {
    userData,
    messagesBeforeUpdate,
    sendMessage,
    currentJoinedTeam,
    currentTeam,
    deleteAllTeamMessages,
    setCurrentTeam,
    setCurrentJoinedTeam,
  } = useAuth();
  return (
    <div className="md:w-2/3 md:pl-32 p-1 pt-20">
      <div className="font-Josefin text-3xl border-green-400 bg-gray-200 p-2 text-gray-600 border-b mb-2">
        Chat
      </div>
      <AblyChatComponent
        setCurrentJoinedTeam={setCurrentJoinedTeam}
        userData={userData}
        key={"1212"}
        setCurrentTeam={setCurrentTeam}
        sendMessage={sendMessage}
        messagesBeforeUpdate={messagesBeforeUpdate}
        deleteAllTeamMessages={deleteAllTeamMessages}
        currentJoinedTeam={currentJoinedTeam}
        currentTeam={currentTeam}
      ></AblyChatComponent>
    </div>
  );
}
