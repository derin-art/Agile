import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";

export default function SprintCardDisplay({
  id,
  index,
  AcceptanceCriteria,
  PriorityRank,
  storyPoints,
  name,
  DateCreated,
  theme,
}) {
  const [infoOpen, setInfoOpen] = useState(true);
  console.log(id, name);
  const ID = id;
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
      index={id}
      className={`p-1 mt-2 overflow-x-hidden w-56 h-32 w-full relative bg-gradient-to-b from-indigo-700 to-indigo-900 text-white border-l-[6px] border-${
        theme.color === "indigo" ? "green-300" : theme.color
      }`}
      key={`${id}`}
    >
      <div
        className={`h-24 w-full absolute bg-red-400 duration-300 ${
          infoOpen ? "left-full" : "left-0"
        }`}
      >
        <button
          onClick={() => {
            setInfoOpen((prev) => !prev);
          }}
          className="z-30 p-2"
        >
          close
        </button>
      </div>
      <button
        onClick={() => {
          setInfoOpen((prev) => !prev);
        }}
        className="z-30"
      >
        open
      </button>
      <div className="text-3xl font-bold flex items-center w-full relative">
        {name}
        <p className="text-lg font-light absolute right-1 top-1 font-Josefin">
          {storyPoints} points
        </p>
      </div>

      <div className="w-56 text-xs font-Josefin">{AcceptanceCriteria}</div>
    </div>
  );
}
