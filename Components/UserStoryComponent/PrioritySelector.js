import { useState } from "react";

export default function PrioritySelector({
  color,
  priority,
  name,
  setFunc,
  selectedColor,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const alertIcon = (style) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className={style}
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z" />
      </svg>
    );
  };

  return (
    <div className="relative">
      <div
        className={`absolute w-24 text-xs duration-300 -top-12 bg-white shadow-md rounded p-2 ${
          !isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        {name}
      </div>
      <button
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onClick={() => {
          setFunc(priority);
        }}
      >
        {alertIcon(
          `fill-${color} hover:border-b-4 duration-150 border-indigo-800 rounded ${
            selectedColor === priority ? "border-b-4 border-green-400" : ""
          }`
        )}
      </button>
    </div>
  );
}
