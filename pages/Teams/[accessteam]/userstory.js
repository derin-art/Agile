import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Release from "../../../Components/ProductOwner/Release";
import UserStoryCard from "../../../Components/ProductOwner/UserStory";
import StoryTeamCard from "../../../Components/StoryTeamCard";
import { useAuth } from "../../../Context/firebaseUserContext";
import swordIcon from "../../../public/swordIcon";
import { toast, ToastContainer } from "react-toastify";
import { async, map } from "@firebase/util";
import Logo from "../../../public/logo";

export default function UserStory() {
  const {
    setTheme: SetTheme,
    themes: Themes,
    saveStories,
    currentOpenRelease,
    setCurrentOpenRelease,
    setCurrentPinsOpen,
    currentPinsOpen,
    currentPinsOpenRevised,
    setCurrentPinsOpenRevised,
    currentReleaseEpics,
  } = useAuth();

  const allSaveThemes = [];

  const [savedThemes, setSavedThemes] = useState([]);
  const [currentEpic, setCurrentEpic] = useState("Notheme");
  const [currentEpicRevised, setCurrentEpicRevised] = useState("allPins");
  const [themeColor, setThemeColor] = useState("");
  const [themeName, setThemeName] = useState("");
  const [dataSaved, setDataSaved] = useState({ status: "", loading: false });

  const uniqueEpics = [
    ...new Set(currentReleaseEpics.map((item) => item.name)),
  ];

  uniqueEpics.forEach((name) => {
    const found = currentReleaseEpics.find((item) => {
      return name === item.name;
    });

    allSaveThemes.push(found);
  });

  const [themes, setTheme] = useState([...allSaveThemes]);

  console.log("themes", themes, Themes);

  useEffect(() => {
    if (!Themes[0]) {
      SetTheme(themes);
    }
  }, []);

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

  const onDragEndFinal = (result) => {
    console.log(currentPinsOpen);
    if (!result.destination) {
      return;
    }
    console.log("rann");
    console.log("drop", result.source.droppableId);
    const listCopy = { ...currentPinsOpen };
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

    setCurrentPinsOpen(listCopy);
  };

  const onDragEndMultiple = (result) => {
    if (!result.destination) {
      return;
    } else {
      if (
        !(
          themes.filter((e) => e.name === result.destination.droppableId)
            .length > 0
        )
      ) {
        console.log(result.destination.type, "keey");
        console.log(
          "MMMM",
          themes.includes((item) => {
            return item.name != result.destination.droppableId;
          })
        );
        const listCopy = { ...currentPinsOpenRevised[currentEpic] };

        console.log(currentPinsOpenRevised.currentEpic, "listCopyMm");

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
          return { ...prev, [currentEpic]: listCopy };
        });
        return;
      } else {
        const listCopy = { ...currentPinsOpenRevised };
        console.log("right one");
        console.log(currentPinsOpenRevised, "right One");

        console.log("EPiccQ", currentEpic, listCopy[currentEpic]);
        const sourceList = listCopy[currentEpic][result.source.droppableId];

        console.log("sourceList", sourceList);
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
            [currentEpic]: {
              ...prev.defaultArr,
              [result.source.droppableId]: listCopy[result.source.droppableId],
            },
            ...finalArr,
          };
          console.log("newNew", newNew);

          return newNew;
        });
      }
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
            key={`${item}-${shades}`}
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
    <div className="mt-16 md:ml-4">
      <p className="text-3xl mb-2 text-gray-300 border-b border-green-300 font-Josefin">
        BackLog
      </p>
      <div className=" flex -z-50">
        <ToastContainer></ToastContainer>
        <div className="border rounded-xl shadow">
          <UserStoryCard></UserStoryCard>
        </div>

        <div className="flex flex-col">
          <div className="border w-full ml-2 mr-1 rounded-xl flex p-2 shadow-lg">
            <DragDropContext onDragEnd={onDragEndFinal}>
              <div className="flex-col mr-4 font-Josefin relative">
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
                    if (themes.some((item) => item.name === themeName)) {
                      toast.error("Epic name is already in Use", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        className: "text-sm",
                      });
                      return;
                    }
                    SetTheme((prev) => {
                      return [...prev, { name: themeName, color: themeColor }];
                    });
                    setCurrentPinsOpen((prev) => {
                      return { ...prev, [themeName]: [] };
                    });
                  }}
                  className="p-1 z-50 font-Josefin bg-indigo-800 text-sm text-green-300 rounded "
                >
                  Create a New Epic{" "}
                  {swordIcon(
                    "fill-green-300 inline group-hover:fill-indigo-800"
                  )}
                </button>
                <div className="-z-50">
                  <input
                    className={`border p-1 -z-50 mb-2 mt-2 -z-50 border-${themeColor} rounded border-r-4`}
                    placeholder="Epic Name"
                    onChange={(e) => {
                      setThemeName(e.target.value);
                    }}
                  ></input>
                  <div className="flex flex-col mb-2 text-gray-500">
                    <p>Select Epic color</p>
                  </div>
                  <div className="w-44 scrollbar-thin border p-2 rounded border-green-300 scrollbar-thumb-indigo-800 scrollbar-track-green-300 overflow-y-scroll h-16 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    {colorCOdes()}
                  </div>
                </div>

                <div className="absolute bottom-2 flex items-center">
                  <button
                    className="text-sm bg-indigo-800 p-2 text-green-300 rounded shadow hover:text-indigo-800 hover:border border-indigo-800 hover:bg-white"
                    onClick={async () => {
                      setDataSaved((prev) => ({ ...prev, loading: true }));
                      console.log("Mkk", currentPinsOpen);
                      const editedPinsWithEpics = Object.entries(
                        currentPinsOpen
                      ).map((item, index) => {
                        if (item) {
                          return item[1].map((pins) => {
                            if (pins) {
                              console.log("checkingThemes", Themes);
                              const itemColor = Themes.filter((theme) => {
                                if (theme) {
                                  return theme.name === item[0];
                                }
                              });
                              console.log(
                                "itemColor",
                                itemColor,
                                item[0],
                                themes
                              );

                              const newTheme = {
                                name: item[0],
                                color: itemColor[0].color,
                              };
                              return { ...pins, theme: newTheme };
                            }
                          });
                        } else {
                          return;
                        }
                      });

                      const response = await saveStories(
                        editedPinsWithEpics.flat()
                      );
                      console.log("response", response);
                      setDataSaved((prev) => ({
                        loading: false,
                        status: response.status,
                      }));
                    }}
                  >
                    Save current state
                  </button>
                  {dataSaved.loading &&
                    Logo("ml-2 fill-green-400 animate-spin")}
                </div>
              </div>

              <div className="flex max-w-[650px] h-96 overflow-auto scrollbar-thin scrollbar-thumb-indigo-800 scrollbar-track-green-300 shadow scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <div className="flex ml-2">
                  {Object.entries(currentPinsOpen).map((epic) => {
                    if (epic[0]) {
                      console.log("dd", epic[0], themes);
                      const themeObject = themes.filter(
                        (item) => item.name === epic[0]
                      );
                      console.log("themeObject", themeObject);
                      return (
                        <Droppable droppableId={epic[0].toString()}>
                          {(provided) => {
                            return (
                              <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`h-96 overflow-auto shadow-lg w-48 flex-col flex items-center mr-2 rounded-t scrollbar-thin scrollbar-thumb-indigo-800 scrollbar-track-green-300  ${
                                  themeObject[0]
                                    ? `border-${themeObject[0].color}`
                                    : ""
                                } border-t-4`}
                              >
                                {currentPinsOpen[epic[0]].map((item, index) => {
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
                    }
                  })}
                </div>
              </div>
              <div className="flex flex-col ml-4 max-h-[500px] overflow-auto scrollbar-thin items-center w-40 scrollbar-thumb-indigo-800 scrollbar-track-green-300">
                {Themes.map((item) => {
                  console.log("themes", Themes);
                  if (item) {
                    return (
                      <Droppable droppableId={item.name} key={item.name}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={`border border-${
                                item.color
                              } border-r-4 mb-8 p-6 rounded font-Josefin duration-200 mr-4 w-32 shadow ${
                                snapshot.isDraggingOver ? "scale-110" : ""
                              }`}
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              key={item.name}
                              onClick={() => {
                                setCurrentEpicRevised((prev) => {
                                  if (item.name === "Notheme") return "allPins";
                                  else return item.name;
                                });
                              }}
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
    </div>
  );
}
