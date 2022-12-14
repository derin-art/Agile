import React, { useState } from "react";

import infoIcon from "../../public/infoIcon";
import StoryTeamCard from "../StoryTeamCard";
import { useAuth } from "../../Context/firebaseUserContext";
import { toast, ToastContainer } from "react-toastify";
import PrioritySelector from "../UserStoryComponent/PrioritySelector";

export default function UserStory() {
  const { addUserStory, currentOpenRelease } = useAuth();

  const [color, setColor] = useState("green");

  const fibonnaciScale = [1, 2, 3, 5, 8, 13, 21];

  const [storyPoints, setStoryPoints] = useState(1);

  const [rankHovered, setRankHovered] = useState("");
  const [explainHovered, setExplainedHovered] = useState(false);

  const [storyName, setStoryName] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");

  const storyPointsClick = (e) => {
    setStoryPoints(e.target.value);
  };

  const [userstories, setUserStories] = useState([]);
  const storyPrioritiesArr = [
    { name: " low risk, high value", color: "green-400", priority: "green" },
    {
      name: "high risk, high value",
      color: "yellow-400",
      priority: "yellow",
    },
    {
      name: " low risk, low value",
      color: "orange-400",
      priority: "orange",
    },
    { name: "high risk, low value", color: "red-400", priority: "red" },
  ];

  return (
    <div className="w-fit  font-Josefin border-indigo-100 relative rounded-xl h-full">
      <div className="p-2 flex flex-col">
        <p className="hidden border-b-4 border-yellow-300">N</p>
        <p className="hidden border-b-4 border-orange-300">N</p>
        <p className="hidden border-b-4 border-red-300">N</p>
        <p
          className={`text-indigo-800 border-b-4 border-${color}-300 w-fit mb-2`}
        >
          User Story Creator
        </p>
        <div className="flex flex-col">
          <input
            placeholder="Story Name"
            className="p-2 rounded border"
            onChange={(e) => {
              setStoryName(e.target.value);
            }}
          ></input>
          <textarea
            placeholder="Acceptance Criteria"
            onChange={(e) => {
              setAcceptanceCriteria(e.target.value);
            }}
            className="placeholder:text-sm mt-2 mb-2 p-2  placeholder:text-gray-400 rounded border"
          ></textarea>

          <div className="flex flex-col hidden">
            <button
              className={` bg-green-400 mb-1 hover:bg-green-500 duration-300 text-xs p-1 rounded text-white`}
              onClick={() => {
                setColor("green");
              }}
            >
              low risk, high value
            </button>

            <button
              className="bg-yellow-400 text-xs mb-1 rounded p-1 hover:bg-yellow-500 duration-300 text-white"
              onClick={() => {
                setColor("yellow");
              }}
            >
              high risk, high value
            </button>

            <button
              className="p-1 rounded text-xs text-white bg-orange-400 mb-1  text-white hover:bg-orange-500 duration-300"
              onClick={() => {
                setColor("orange");
              }}
            >
              low risk, low value
            </button>

            <button
              className="rounded text-xs bg-red-400 mb-1 text-white p-1 hover:bg-red-500 duration-300"
              onClick={() => {
                setColor("red");
              }}
            >
              high risk, low value
            </button>
          </div>

          <div>
            <div className="flex">
              <p className="text-sm text-indigo-800">Select Priority Rank</p>
              {storyPrioritiesArr.map((item) => {
                return (
                  <div className="ml-2">
                    {
                      <PrioritySelector
                        setFunc={setColor}
                        selectedColor={color}
                        color={item.color}
                        name={item.name}
                        priority={item.priority}
                        key={item.priority}
                      ></PrioritySelector>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-2 flex text-sm text-indigo-800 items-center">
          Story Points
          {fibonnaciScale.map((item) => {
            return (
              <button
                className={`w-6 h-6 ml-2 text-white rounded-full duration-300 ${
                  storyPoints == item ? "bg-green-400" : "bg-indigo-800"
                }`}
                onClick={(e) => {
                  storyPointsClick(e);
                }}
                value={item}
              >
                {item}
              </button>
            );
          })}
          {infoIcon("ml-2 fill-indigo-600 hidden", "20", "20")}
        </div>
        <button
          className="mt-4  text-sm bg-indigo-800 shadow-inner p-1 text-green-300 rounded hover:text-indigo-800 hover:border border-indigo-800 hover:bg-white"
          onClick={() => {
            if (!storyName) {
              toast.error("Story Name Required", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "text-sm",
              });
              return;
            } else if (!acceptanceCriteria) {
              toast.error("Acceptance Criteria Required", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "text-sm",
              });
              return;
            }
            const data = addUserStory(
              storyName,
              currentOpenRelease[0]._id,
              storyPoints,
              acceptanceCriteria,
              color
            );
          }}
        >
          CREATE
        </button>
      </div>
    </div>
  );
}

/*   <button
            className={`w-6 h-6 ml-2 text-white rounded-full duration-300 ${
              storyPoints == 1 ? "bg-green-400" : "bg-indigo-800"
            }`}
            value={1}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            1
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full duration-300 ${
              storyPoints == 2 ? "bg-green-400" : "bg-indigo-800"
            }`}
            value={2}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            2
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full duration-300 ${
              storyPoints == 3 ? "bg-green-400" : "bg-indigo-800"
            }`}
            value={3}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            3
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full duration-300 ${
              storyPoints == 5 ? "bg-green-400" : "bg-indigo-800"
            }`}
            value={5}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            5
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full duration-300 ${
              storyPoints == 8 ? "bg-green-400" : "bg-indigo-800"
            }`}
            value={8}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            8
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full duration-300 ${
              storyPoints == 13 ? "bg-green-400" : "bg-indigo-800"
            }`}
            value={13}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            13
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full duration-300 ${
              storyPoints == 21 ? "bg-green-400" : "bg-indigo-800"
            }`}
            value={21}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            21
          </button> */
