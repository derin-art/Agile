import alertIcon from "../public/alertIcon";
import deleteIcon from "../public/deleteIcon";

export default function StoryTeamCard({
  name,
  priority,
  criteria,
  points,
  color,
  id,
  teamId,
  releaseId,
  deleteVisible = false,
  deleteFunction,
}) {
  console.log(priority, "pri");
  const purgeCSSSucks = () => {
    return (
      <div>
        <div className="bg-gray-100"></div>
        <div className="bg-gray-200"></div>
        <div className="bg-gray-300"></div>
        <div className="bg-gray-400"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-600"></div>
        <div className="bg-gray-700"></div>
        <div className="bg-gray-800"></div>
        <div className="bg-orange-100"></div>
        <div className="bg-orange-200"></div>
        <div className="bg-orange-300"></div>
        <div className="bg-orange-400"></div>
        <div className="bg-orange-500"></div>
        <div className="bg-orange-600"></div>
        <div className="bg-orange-700"></div>
        <div className="bg-orange-800"></div>
        <div className="bg-indigo-100"></div>
        <div className="bg-indigo-200"></div>
        <div className="bg-indigo-300"></div>
        <div className="bg-indigo-400"></div>
        <div className="bg-indigo-500"></div>
        <div className="bg-indigo-600"></div>
        <div className="bg-indigo-700"></div>
        <div className="bg-indigo-800"></div>
        <div className="bg-green-100"></div>
        <div className="bg-green-200"></div>
        <div className="bg-green-300"></div>
        <div className="bg-green-400"></div>
        <div className="bg-green-500"></div>
        <div className="bg-green-600"></div>
        <div className="bg-green-700"></div>
        <div className="bg-green-800"></div>
        <div className="bg-red-100"></div>
        <div className="bg-red-200"></div>
        <div className="bg-red-300"></div>
        <div className="bg-red-400"></div>
        <div className="bg-red-500"></div>
        <div className="bg-red-600"></div>
        <div className="bg-red-700"></div>
        <div className="bg-red-800"></div>
        <div className="bg-blue-100"></div>
        <div className="bg-blue-200"></div>
        <div className="bg-blue-300"></div>
        <div className="bg-blue-400"></div>
        <div className="bg-blue-500"></div>
        <div className="bg-blue-600"></div>
        <div className="bg-blue-700"></div>
        <div className="bg-blue-800"></div>
        <div className="bg-yellow-100"></div>
        <div className="bg-yellow-200"></div>
        <div className="bg-yellow-300"></div>
        <div className="bg-yellow-400"></div>
        <div className="bg-yellow-500"></div>
        <div className="bg-yellow-600"></div>
        <div className="bg-yellow-700"></div>
        <div className="bg-yellow-800"></div>
        <div className="bg-purple-100"></div>
        <div className="bg-purple-200"></div>
        <div className="bg-purple-300"></div>
        <div className="bg-purple-400"></div>
        <div className="bg-purple-500"></div>
        <div className="bg-purple-600"></div>
        <div className="bg-purple-700"></div>
        <div className="bg-purple-800"></div>
      </div>
    );
  };
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
  return (
    <div
      className={`bg-gradient-to-r from-indigo-700 to-indigo-800 relative duration-75  text-white w-32 h-24 font-Josefin p-2 rounded-lg shadow-inner border-b-8 border-${
        color === "indigo" ? "green-300" : color
      }`}
    >
      {name}
      <div className="hidden fill-orange-400"></div>
      <div className="hidden fill-red-400"></div>
      <div className="hidden fill-yellow-400"></div>
      {alertIcon(
        `fill-${priority}-400 absolute top-0 border-indigo-500 rounded-lg rounded-tr-lg border p-1 bg-white right-0`,
        "30",
        "30"
      )}
      <p className="truncate text-xs hover:text-clip h-20">{criteria}</p>
      <span className="text-xs absolute bottom-2 left-2">{points} Points</span>
      <button className="group">
        {deleteIcon(
          "fill-white absolute bottom-2 right-1 group-hover:fill-green-300",
          "24",
          "24",
          id,
          deleteFunction
        )}
      </button>
    </div>
  );
}
