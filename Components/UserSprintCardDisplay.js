import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import alertIcon from "../public/alertIcon";
import { useAuth } from "../Context/firebaseUserContext";
import { async } from "@firebase/util";
import { ToastContainer, toast } from "react-toastify";

export default function SprintCardDisplay({
  id,
  index,
  AcceptanceCriteria,
  PriorityRank,
  storyPoints,
  name,
  DateCreated,
  theme,
  entireObject,
  releaseId,
  inProgress,
  completed,
  AssignedTo,
}) {
  const [infoOpen, setInfoOpen] = useState(true);
  const [assginedHovered, setAssignedHovered] = useState(false);
  const [assginedUserHovered, setAssignedUserUserHovered] = useState({
    name: "",
  });
  console.log("yess", id, name, PriorityRank);
  const ID = id;
  const { userData, UserStoryInteractions } = useAuth();
  console.log("M", inProgress);
  const infoIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className="fill-green-400"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M16 2l5 5v14.008a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2H16zm-5 5v2h2V7h-2zm0 4v6h2v-6h-2z" />
    </svg>
  );

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className="fill-red-500"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" />
    </svg>
  );
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
      className={`p-1 mt-2 rounded overflow-x-hidden w-56 h-32 w-full relative bg-gradient-to-b from-indigo-700 to-indigo-900 text-white border-l-[6px] border-${
        theme.color === "indigo" ? "green-300" : theme.color
      }`}
      key={`${id}`}
    >
      <div
        className={`h-full  top-0 w-full absolute bg-gray-600 duration-300 ${
          infoOpen ? "left-full" : "left-0"
        }`}
      >
        <button
          onClick={() => {
            setInfoOpen((prev) => !prev);
          }}
          className="z-30 p-2"
        >
          {closeIcon}
        </button>
        <div className="mt-[27px] ml-1 flex relative">
          {" "}
          <button
            className="text-sm border font-Josefin rounded px-1 bg-gray-700"
            onClick={async () => {
              entireObject.inProgress = true;
              if (Array.isArray(entireObject.AssignedTo)) {
                if (
                  entireObject.AssignedTo.find(
                    (item) => item.email === userData.email
                  )
                ) {
                  toast.warn("You've already picked up this story", {
                    className: "text-sm",
                    position: toast.POSITION.BOTTOM_CENTER,
                  });
                  return;
                }
              }

              if (Array.isArray(entireObject.AssignedTo)) {
                entireObject.AssignedTo.push(userData);
              } else {
                entireObject.AssignedTo = [userData];
              }
              console.log(entireObject, releaseId);

              UserStoryInteractions(entireObject, releaseId);
            }}
          >
            Pick Up
          </button>
          <div className="absolute right-2 font-Josefin flex-col">
            {typeof inProgress === "boolean" && inProgress
              ? "In progress"
              : "Not started"}
            <div className="w-full rounded border h-2">
              <div
                className={` ${
                  inProgress ? "hidden" : ""
                } h-full w-1/4 bg-green-400 rounded ${
                  inProgress === "false" ? "block" : ""
                }`}
              ></div>
              <div
                className={`${
                  !inProgress ? "hidden" : ""
                } h-full w-3/4 bg-green-400 rounded ${
                  typeof inProgress === "string" && "hidden"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="h-8 text-sm font-Josefin mt-2 flex oveflow-x-auto w-full">
          {Array.isArray(AssignedTo) ? (
            <div
              className="h-full flex ml-3"
              onMouseOver={() => {
                setAssignedHovered(true);
              }}
              onMouseLeave={() => {
                setAssignedHovered(false);
              }}
            >
              {AssignedTo.map((item) => {
                return (
                  <div
                    onMouseLeave={() => {
                      setAssignedUserUserHovered({ name: "" });
                    }}
                    onMouseOver={() => {
                      setAssignedUserUserHovered(item);
                    }}
                    className={` ${
                      assginedHovered ? "ml-1" : "-ml-2"
                    } h-6 w-6 relative rounded-full border duration-300 capitalize flex items-center justify-center bg-white text-black`}
                  >
                    {" "}
                    <div
                      className={`absolute text-xs font-Josefin border shadow -top-6 rounded left-4 bg-gray-100 duration-300 ${
                        assginedUserHovered.name === item.name
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      {assginedUserHovered.name}
                    </div>
                    {item.name[0]}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="ml-1">Not Active</p>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          setInfoOpen((prev) => !prev);
        }}
        className="z-30"
      >
        {infoIcon}
      </button>
      <div className="hidden fill-orange-400"></div>
      <div className="hidden fill-red-400"></div>
      <div className="hidden fill-yellow-400"></div>
      {alertIcon(
        `fill-${PriorityRank}-400 absolute right-2 top-2 bg-white rounded`,
        "24",
        "24"
      )}
      <div className="text-3xl font-bold font-Josefin flex items-center w-full relative">
        {name}
        <p className="text-lg font-light absolute right-1 top-1 font-Josefin">
          {storyPoints} points
        </p>
      </div>

      <div className="w-56 text-xs font-Josefin h-14 overflow-auto">
        {AcceptanceCriteria}
      </div>
    </div>
  );
}
