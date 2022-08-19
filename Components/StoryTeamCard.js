import alertIcon from "../public/alertIcon";
import deleteIcon from "../public/deleteIcon";

export default function StoryTeamCard({ name, priority, criteria, points }) {
  console.log(priority, "pri");
  return (
    <div className="bg-gradient-to-r relative from-red-400 to-red-500 text-white w-32 h-24 font-Josefin p-2 rounded-xl">
      {name}
      <div className="hidden fill-orange-400"></div>
      <div className="hidden fill-red-400"></div>
      <div className="hidden fill-yellow-400"></div>
      {alertIcon(
        `fill-${priority}-400 absolute top-0 border-red-400 rounded-lg rounded-tr-xl border p-1 bg-white right-0`,
        "30",
        "30"
      )}
      <p className="truncate text-xs hover:text-clip">{criteria}</p>
      <span className="text-xs absolute bottom-2 left-2">{points} Points</span>
      {deleteIcon("fill-red-800 absolute bottom-2 right-1")}
    </div>
  );
}
