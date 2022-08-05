import React, { useState } from "react";
import { Tooltip } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import infoIcon from "../../public/infoIcon";

export default function UserStory() {
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

  const storyPointsClick = (e) => {
    setStoryPoints(e.target.value);
  };

  return (
    <div className="w-fit bg-gray-100 border border-indigo-800 relative">
      <div className={`p-2 bg-${color}-400 absolute top-0 w-full`}></div>
      <div className="mt-4 p-2 flex flex-col px-6">
        <p>User Story Creator</p>
        <div className="flex flex-col">
          <input placeholder="title" className="p-2"></input>
          <textarea
            placeholder="Description/Acceptance Criteria"
            className="placeholder:text-sm mt-2 mb-2 p-2"
          ></textarea>
          <div className="flex">
            <p className="text-sm">Priority rank</p>
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
        <div className="mt-2 flex text-sm">
          Story Points
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full ${
              storyPoints == 1 ? "bg-green-400" : "bg-black"
            }`}
            value={1}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            1
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full ${
              storyPoints == 2 ? "bg-green-400" : "bg-black"
            }`}
            value={2}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            2
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full ${
              storyPoints == 3 ? "bg-green-400" : "bg-black"
            }`}
            value={3}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            3
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full ${
              storyPoints == 5 ? "bg-green-400" : "bg-black"
            }`}
            value={5}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            5
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full ${
              storyPoints == 8 ? "bg-green-400" : "bg-black"
            }`}
            value={8}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            8
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full ${
              storyPoints == 13 ? "bg-green-400" : "bg-black"
            }`}
            value={13}
            onClick={(e) => {
              storyPointsClick(e);
            }}
          >
            13
          </button>
          <button
            className={`w-6 h-6 ml-2 text-white rounded-full ${
              storyPoints == 21 ? "bg-green-400" : "bg-black"
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
            {infoIcon("ml-2 fill-green-400", "20", "20")}
          </BlueOnGreenTooltip>
        </div>
        <button className="mt-8">Create</button>
      </div>
    </div>
  );
}
