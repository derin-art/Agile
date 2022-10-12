import dynamic from "next/dynamic";

const AblyChatComponent = dynamic(
  () => import("../../Components/AlbyChatComponent"),
  { ssr: false }
);

export default function UserCommunication() {
  return (
    <div className="w-2/3 pl-32 pt-20">
      <div className="font-Josefin text-3xl border-green-400 bg-gray-200 p-2 text-gray-600 border-b mb-2">
        Chat
      </div>
      <AblyChatComponent></AblyChatComponent>
    </div>
  );
}
