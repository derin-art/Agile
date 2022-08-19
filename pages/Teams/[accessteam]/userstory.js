import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Release from "../../../Components/ProductOwner/Release";
import UserStoryCard from "../../../Components/ProductOwner/UserStory";
import StoryTeamCard from "../../../Components/StoryTeamCard";
import { useAuth } from "../../../Context/firebaseUserContext";
import swordIcon from "../../../public/swordIcon";
import { toast, ToastContainer } from "react-toastify";

export default function UserStory() {
  const {
    currentOpenRelease,
    setCurrentOpenRelease,
    setCurrentPinsOpen,
    currentPinsOpen,
    currentPinsOpenRevised,
    setCurrentPinsOpenRevised,
  } = useAuth();

  const [themeColor, setThemeColor] = useState("");
  const [themeName, setThemeName] = useState("");

  const [themes, setTheme] = useState([]);

  console.log(currentPinsOpenRevised, "finall");

  const colorArr = [];

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

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === "names") {
    }
    console.log("destination", result.destination);
    const newItems = [...currentPinsOpen.allPins];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    console.log(newItems, "newItems");
    const modefiedNewitems = { allPins: newItems };
    setCurrentPinsOpen((prev) => {
      console.log(prev, "oldItems");
      return modefiedNewitems;
    });
  }

  const onDragEndMultiple = (result) => {
    if (!result.destination) {
      return;
    }

    if (false) {
      console.log(result.destination.type, "keey");
      console.log(
        "MMMM",
        themes.includes((item) => {
          return item.name != result.destination.droppableId;
        })
      );
      const listCopy = { ...currentPinsOpenRevised.defaultArr };

      console.log(currentPinsOpenRevised.defaultArr, "listCopyMm");

      const sourceList = listCopy[result.source.droppableId];

      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
      );
      listCopy[result.source.droppableId] = newSourceList;

      const destinationList = listCopy[result.destination.droppableId];
      listCopy[result.destination.droppableId] = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );
      console.log(listCopy);
      setCurrentPinsOpenRevised((prev) => {
        return { ...prev, defaultArr: listCopy };
      });
      return;
    } else {
      const listCopy = { ...currentPinsOpenRevised };
      console.log("right one");
      console.log(currentPinsOpenRevised, "right One");

      const sourceList = listCopy.defaultArr[result.source.droppableId];

      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
      );
      listCopy[result.source.droppableId] = newSourceList;

      const destinationList = listCopy[result.destination.droppableId];
      const destinationListArr = [];
      console.log("MM", destinationList);
      Object.entries(destinationList).forEach((item) => {
        if (item) {
          destinationListArr.push(...item[1]);
        }
      });
      listCopy[result.destination.droppableId] = addToList(
        destinationListArr,
        result.destination.index,
        removedElement
      );
      console.log(
        "allThedata",
        listCopy[result.source.droppableId],
        listCopy[result.destination.droppableId]
      );
      setCurrentPinsOpenRevised((prev) => {
        const finalArr = {};
        const defaultArr = {};
        let arrNo = 0;
        for (
          let i = 0;
          i < listCopy[result.destination.droppableId].length;
          i += 1
        ) {
          if (i % 4 === 0) {
            arrNo++;
            defaultArr = { ...defaultArr, [arrNo.toString()]: [] };
            console.log(arrNo, "No");
          }

          defaultArr[arrNo].push(listCopy[result.destination.droppableId][i]);

          console.log(defaultArr, "default");
        }
        finalArr = {
          ...finalArr,
          [result.destination.droppableId]: defaultArr,
        };

        console.log("COdd", destinationListArr, finalArr, [
          result.destination.droppableId,
        ]);

        const newNew = {
          ...prev,
          defaultArr: {
            ...prev.defaultArr,
            [result.source.droppableId]: listCopy[result.source.droppableId],
          },
          ...finalArr,
          /*   [result.destination.droppableId]:
            listCopy[result.destination.droppableId] */
        };
        console.log("newNew", newNew);
        /* { ...prev, [result.destination.droppableId]: listCopy } */
        return newNew;
      });
    }
  };

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

  const colorCOdes = () => {
    const allColors = [];
    const colorNames = [
      "yellow",
      "green",
      "indigo",
      "blue",
      "orange",
      "purple",
      "red",
    ];
    const colorShades = ["100", "200", "300", "400", "500", "600"];
    colorNames.forEach((item) => {
      colorShades.forEach((shades) => {
        allColors.push(
          <button
            className={`bg-${item}-${shades} w-8 min-h-8 mr-1 rounded my-2`}
            onClick={() => {
              setThemeColor(`${item}-${shades}`);
            }}
          >
            <p className={`opacity-0`}>hllk</p>
          </button>
        );
      });
    });
    return allColors;
  };

  return (
    <div className="mt-16 md:ml-4 flex -z-50">
      <ToastContainer></ToastContainer>
      <div className="">
        <UserStoryCard></UserStoryCard>
        <DragDropContext>
          <Droppable droppableId="characters" direction="horizontal">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Draggable draggableId="2" index={1}>
                  {(provided) => (
                    <li
                      index={1}
                      className="bg-green-300 m-2 w-fit"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      Heyyd
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="1" index={2}>
                  {(provided) => (
                    <li
                      index={2}
                      className="bg-green-300 m-2 w-fit"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      Heyy
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex flex-col">
        <div className="border w-full ml-2 mr-1 rounded-xl flex p-2">
          <DragDropContext onDragEnd={onDragEndMultiple}>
            <div className="flex-col mr-4 font-Josefin">
              <button
                style={{ transitionDuration: "3s" }}
                onClick={() => {
                  if (!themeColor || !themeName) {
                    toast.error("Epic color and Name required for new Epic", {
                      position: toast.POSITION.BOTTOM_CENTER,
                      className: "text-sm",
                    });
                    return;
                  }
                  setTheme((prev) => {
                    return [
                      ...prev,
                      { name: themeName, epicColor: themeColor },
                    ];
                  });
                  setCurrentPinsOpenRevised((prev) => {
                    return { ...prev, [themeName]: {} };
                  });
                }}
                className="p-1 z-50 font-Josefin bg-gradient-to-r from-indigo-300 via-blue-300 to-green-300 text-white font-sm rounded-md hover:bg-gradient-to-r hover:from-green-300 hover:via-indigo-300 hover:to-blue-300"
              >
                Create a New Epic {swordIcon("fill-white inline")}
              </button>
              <div className="-z-50">
                <input
                  className="border p-1 -z-50 mb-2 mt-2 -z-50 border-green-300 rounded"
                  placeholder="Epic Name"
                  onChange={(e) => {
                    setThemeName(e.target.value);
                  }}
                ></input>
                <div>Select Epic color</div>
                <div className="w-44 scrollbar-thin border p-2 rounded border-green-300 scrollbar-thumb-indigo-800 scrollbar-track-green-300 overflow-y-scroll h-16 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                  {colorCOdes()}
                </div>
              </div>
              {/* scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-green-300 h-32 overflow-y-scroll overflow-auto h-16 scrollbar-track-rounded-full scrollbar-thumb-rounded-full */}
              {/* scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full */}
            </div>
            {/*  <Droppable droppableId="other1">
            {(provided) => {
              return (
                <div
                  className="names border border-green-300"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  name
                  {currentOpenRelease.other1 &&
                  currentPinsOpen.other1.length > 0 ? (
                    currentPinsOpen.other1.map(item, (index) => {
                      return <div>{index}</div>;
                    })
                  ) : (
                    <p>No pins</p>
                  )}
                </div>
              );
              {
                provided.placeholder;
              }
            }}
          </Droppable>
          <Droppable droppableId="allPins">
            {(provided) => {
              return (
                <ul
                  className="allPins"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {currentPinsOpen ? (
                    currentPinsOpen.allPins.map((item, index) => {
                      console.log(index, "index");
                      if (item) {
                        return (
                          <Draggable
                            draggableId={item._id}
                            index={index}
                            key={item._id}
                          >
                            {(provided) => (
                              <li
                                index={item._id}
                                className="p-1"
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
                                ></StoryTeamCard>
                              </li>
                            )}
                          </Draggable>
                        );
                      }
                    })
                  ) : (
                    <p>No stories created yet</p>
                  )}
                  {provided.placeholder}
                </ul>
              );
            }}
          </Droppable> */}
            {Object.entries(currentPinsOpenRevised.defaultArr).map((item) => {
              console.log(item);
              return (
                <Droppable droppableId={item[0]}>
                  {(provided) => {
                    return (
                      <ul
                        className={item[0]}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {item[1].map((item, index) => {
                          if (item) {
                            console.log(item, "item");
                            return (
                              <Draggable
                                draggableId={item._id}
                                index={index}
                                key={item._id}
                              >
                                {(provided) => (
                                  <li
                                    index={item._id}
                                    className="p-1"
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
                                    ></StoryTeamCard>
                                  </li>
                                )}
                              </Draggable>
                            );
                          }
                        })}
                      </ul>
                    );
                  }}
                </Droppable>
              );
            })}
            <div className="flex flex-col ml-10">
              {themes.map((item) => {
                if (item) {
                  return (
                    <Droppable droppableId={item.name} key={item.name}>
                      {(provided) => {
                        return (
                          <div
                            className="border border-green-300 mt-2 p-4"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {item.name}
                          </div>
                        );
                        {
                          provided.placeholder;
                        }
                      }}
                    </Droppable>
                  );
                }
              })}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
