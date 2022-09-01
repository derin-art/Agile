import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import StoryTeamCard from "./StoryTeamCard";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SprintCard from "./SprintsCard";
import { useAuth } from "../Context/firebaseUserContext";

export default function ReleaseDraggable({
  agilePins,
  dateEnd,
  dateStart,
  name,
  id,
}) {
  const [Sprints, setSprints] = useState([
    { name: "Sprint", duration: 3, stories: [] },
  ]);
  const [RealSprints, setRealSprints] = useState({
    Sprint: { duration: 3, stories: [] },
  });
  const finalRealSprints = {};

  const obj = {};

  Sprints.forEach((elem, i) => {
    obj[elem.name] = elem.stories;
  });

  console.log(obj, "flat");

  Sprints.forEach((item) => {
    const name = item.name;
    const stories = item.stories;
    return { ...finalRealSprints, [name]: stories };
  });

  const [sprintDuration, setSprintDuration] = useState("");
  const [sprintName, setSprintName] = useState("");

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

  const SprintsObjectNames = Sprints.map((item) => {
    return item.name;
  });

  const SprintsObjected = Object.assign({}, Sprints);

  const [testArray, setTestArray] = useState({
    ye: [...agilePins],
    ...obj,
  });

  console.log(Object.entries(testArray));

  const removeFromList = (list, index) => {
    console.log(list, "liut");
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const onDragEndFinal = (result) => {
    if (!result.destination) {
      return;
    }
    console.log("rann");
    console.log("drop", result.source.droppableId);
    const listCopy = { ...testArray };
    console.log("listcopy", listCopy);
    const arrayKey = result.source.droppableId;
    console.log("arr", arrayKey);
    const sourceList = listCopy[arrayKey];
    console.log("sourceList", sourceList);
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    console.log("destination", result.destination.droppableId);
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setTestArray(listCopy);
  };

  const allDisplaycolor = agilePins.map((pins) => {
    if (pins.theme.color === "indigo") {
      return "green-300";
    }
    return pins.theme.color;
  });

  const finalArr = [];

  agilePins.forEach((item) => {
    if (finalArr.find((obj) => obj.name === item.theme.name)) return;

    if (item.theme.color === "indigo") {
      finalArr.push({ name: item.theme.name, color: "green-300" });
    } else {
      finalArr.push({ name: item.theme.name, color: item.theme.color });
    }
  });

  return (
    <div className="border w-full shadow rounded p-2 border-l-8 border-green-300">
      {
        <div className="flex justify-center mb-4">
          {" "}
          <div className="mr-4 font-Josefin text-sm">Epics/Themes:</div>
          {finalArr.map((item) => {
            return (
              <div
                className={`border-${item.color} border-l-4 font-Josefin rounded text-sm mr-4`}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      }
      <DragDropContext onDragEnd={onDragEndFinal}>
        <div className="flex ">
          <div className="flex justify-center">
            <div className="-rotate-90 text-4xl ml-20 font-Josefin text-gray-500">
              <p className="text-sm ml-1">Release</p>
              {name}
            </div>
            <div>
              <input
                className="border p-1 text-sm placeholder:text-sm font-Josefin border-green-300"
                placeholder="SprintName"
                onChange={(e) => {
                  setSprintName(e.target.name);
                }}
              ></input>
              <div className="font-Josefin mt-2">
                <div className="text-sm">Sprint duration (weeks)</div>
                <div>
                  <button
                    className="border h-8 w-8 text-white bg-green-300 rounded-sm mr-2"
                    onClick={() => {
                      setSprintDuration(1);
                    }}
                  >
                    1
                  </button>
                  <button
                    className="border h-8 w-8 text-white bg-green-300 rounded-sm mr-2"
                    onClick={() => {
                      setSprintDuration(2);
                    }}
                  >
                    2
                  </button>
                  <button
                    className="border h-8 w-8 text-white bg-green-300 rounded-sm mr-2"
                    onClick={() => {
                      setSprintDuration(3);
                    }}
                  >
                    3
                  </button>
                  <button
                    className="border h-8 w-8 text-white bg-green-300 rounded-sm mr-2"
                    onClick={() => {
                      setSprintDuration(4);
                    }}
                  >
                    4
                  </button>
                </div>
              </div>
              <button
                className="text-sm border border-green-300 font-Josefin p-2 mt-2 bg-indigo-800 text-green-300 rounded"
                onClick={() => {
                  if (!sprintName) {
                    toast.error("sprint name required to create sprint", {
                      position: toast.POSITION.BOTTOM_CENTER,
                      className: "text-sm",
                    });
                    return;
                  }
                  if (!sprintDuration) {
                    toast.error("sprint duration not set", {
                      position: toast.POSITION.BOTTOM_CENTER,
                      className: "text-sm",
                    });
                    return;
                  }
                  setSprints((prev) => {
                    return {
                      name: sprintName,
                      duration: sprintDuration,
                      stories: [],
                    };
                  });
                }}
              >
                Create Sprint
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            {Object.entries(testArray).map((story) => {
              console.log(story, "story");
              console.log(Object.entries(testArray));
              if (story[0] === "ye") {
                return (
                  <Droppable direction="horizontal" droppableId="ye">
                    {(provided) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="flex h-full w-full"
                        >
                          <div className="flex-col flex border font-Josefin">
                            <div className="flex">
                              {story[1].map((item, index) => {
                                if (item) {
                                  return (
                                    <Draggable
                                      draggableId={item._id}
                                      index={index}
                                      key={item._id}
                                    >
                                      {(provided) => (
                                        <div
                                          index={item._id}
                                          className="p-1 mt-2 z-10"
                                          key={item._id}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          id={item._id}
                                        >
                                          <StoryTeamCard
                                            name={item.name}
                                            criteria={item.AcceptanceCriteria}
                                            points={item.storyPoints}
                                            priority={item.PriorityRank}
                                            key={item._id}
                                            color={item.theme.color}
                                          ></StoryTeamCard>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </Droppable>
                );
              } else {
                const Sprint = Sprints.filter((item) => item.name === story[0]);
                console.log(Sprint, "sprint");
                return (
                  <div>
                    <SprintCard
                      name={Sprint[0].name}
                      duration={Sprint[0].duration}
                      stories={story[1]}
                    ></SprintCard>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </DragDropContext>
      <ToastContainer></ToastContainer>
    </div>
  );
}
