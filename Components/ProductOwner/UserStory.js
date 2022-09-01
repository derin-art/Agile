import React, { useState } from "react";
import { Tooltip } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import infoIcon from "../../public/infoIcon";
import StoryTeamCard from "../StoryTeamCard";
import { useAuth } from "../../Context/firebaseUserContext";
import { toast, ToastContainer } from "react-toastify";

export default function UserStory() {
  const { addUserStory, currentOpenRelease } = useAuth();
  console.log(currentOpenRelease, "CUrrent release");
  const BlueOnGreenTooltip = withStyles({
    tooltip: {
      color: "lightblue",
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: "1px  1px #4ade80",
      border: "1px #4ade80 solid",
      marginTop: "10px",
    },
  })(Tooltip);
  const [color, setColor] = useState("green");

  const fibonnaciScale = [1, 2, 3, 5, 8, 13, 21];

  const [storyPoints, setStoryPoints] = useState(1);

  const [storyName, setStoryName] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");

  const storyPointsClick = (e) => {
    setStoryPoints(e.target.value);
  };

  const [userstories, setUserStories] = useState([]);

  return (
    <div className="w-fit  font-Josefin border-indigo-100 relative rounded-xl h-full">
      <div className="mt-4 p-2 flex flex-col">
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
            className="p-2 bg-indigo-800 text-green-300 rounded-sm"
            onChange={(e) => {
              setStoryName(e.target.value);
            }}
          ></input>
          <textarea
            placeholder="Description/Acceptance Criteria"
            onChange={(e) => {
              setAcceptanceCriteria(e.target.value);
            }}
            className="placeholder:text-sm mt-2 mb-2 p-2 bg-indigo-800 text-green-300 placeholder:text-gray-400 rounded-sm"
          ></textarea>
          <div className="flex items-center">
            <p className="text-sm text-indigo-800">Priority Rank</p>
            <BlueOnGreenTooltip
              title={<p className="text-xs">low risk, high value</p>}
            >
              <button
                className={`w-4 h-4 bg-green-400 ml-2`}
                onClick={() => {
                  setColor("green");
                }}
              ></button>
            </BlueOnGreenTooltip>
            <BlueOnGreenTooltip
              title={<p className="text-xs">high risk, high value</p>}
            >
              <button
                className="w-4 h-4 bg-yellow-400 ml-2"
                onClick={() => {
                  setColor("yellow");
                }}
              ></button>
            </BlueOnGreenTooltip>
            <BlueOnGreenTooltip
              title={<p className="text-xs">low value, low risk</p>}
            >
              <button
                className="w-4 h-4 bg-orange-400 ml-2"
                onClick={() => {
                  setColor("orange");
                }}
              ></button>
            </BlueOnGreenTooltip>
            <BlueOnGreenTooltip
              title={<p className="text-xs">high risk, low value</p>}
            >
              <button
                className="w-4 h-4 bg-red-400 ml-2"
                onClick={() => {
                  setColor("red");
                }}
              ></button>
            </BlueOnGreenTooltip>
          </div>
        </div>
        <div className="mt-2 flex text-sm text-indigo-800 items-center">
          Story Points
          <button
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
          </button>
          <BlueOnGreenTooltip
            title={
              <p className="text-xs">
                The fibbonaci scale; A non-linear way of accesing story size.
                The scale is relative with 1 representing the smallest story and
                21, the largest story. Any size above it should be broken down
                into smaller stories and made into a{" "}
                <span className="font-bold text-green-400">theme</span>.
              </p>
            }
          >
            {infoIcon("ml-2 fill-indigo-600", "20", "20")}
          </BlueOnGreenTooltip>
        </div>
        <button
          className="mt-8  text-sm bg-indigo-800 shadow-inner p-1 text-green-300 rounded hover:text-indigo-800 hover:border border-indigo-800 hover:bg-white"
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
            addUserStory(
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
      <ToastContainer></ToastContainer>
    </div>
  );
}
