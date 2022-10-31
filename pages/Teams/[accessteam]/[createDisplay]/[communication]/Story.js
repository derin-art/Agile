import { useAuth } from "../../../../../Context/firebaseUserContext";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import Mapped from "../../../../../Components/Mapped";
import { v4 as uuidv4 } from "uuid";
import Logo from "../../../../../public/logo";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import parseJson from "parse-json";
import StoryMapRender from "../../../../../Components/StoryMapRender";
import TutorialIcon from "../../../../../public/TutorialIcon";

export default function Story() {
  const sideArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M16 12l-6 6V6z" />
    </svg>
  );
  const { currentTeam, saveMap } = useAuth();
  const [savedStory, setSavedStory] = useState(false);
  const [themes, setThemes] = useState([]);

  const [themeName, setThemeName] = useState("");
  const [allArray, setAllArray] = useState({ notUsed: [] });

  const launchTutorial = () => {
    toast.info(
      <div>
        Story Maps are an essential part of any good Agile and Scrum system. It
        display the intended progression of the app development in relation to
        Time and each of the releases. Themes are overarching ideas that stories
        and epics fall under on the story map. The horizontal axis representing
        the time flow and the vertical, the priority of stories. The stories in
        the epics are stacked based on priority.
      </div>,
      {
        autoClose: false,
        position: toast.POSITION.TOP_RIGHT,
        className: "text-sm",
      }
    );
  };

  let tutorialBool = "";
  if (typeof window !== "undefined") {
    tutorialBool = parseJson(window.localStorage.getItem("enableTutorial"));
  }

  useEffect(() => {
    tutorialBool && launchTutorial();
  }, []);

  let beArray = {};

  currentTeam &&
    currentTeam[0].Release.forEach((release) => {
      const allThemes = release.agilePins.map((item) => {
        if (item) {
          if (item.theme.name === "Notheme") return;
          else {
            return { tName: item.theme.name, pins: [], info: item.theme };
          }
        }
      });

      const allThemeFilterd = allThemes.filter((allTheme) => {
        if (allTheme) {
          return allTheme;
        }
      });

      const finalArrayThemed = [];

      const finalThemeFiltered = allThemeFilterd.forEach((filtered) => {
        if (finalArrayThemed.find((found) => found.tName === filtered.tName))
          return;
        finalArrayThemed.push(filtered);
      });

      const arrayToBe =
        currentTeam &&
        release.agilePins.map((item) => {
          if (item) {
            if (item.theme.name === "Notheme") {
              return item;
            } else {
              finalArrayThemed.forEach((theme) => {
                if (item.theme.name === theme.tName) {
                  theme.pins.push(item);
                }
              });
              return;
            }
          }
        });
      const finalArrayToBe = arrayToBe.filter((obj) => {
        if (obj) {
          return obj;
        }
      });

      console.log([...finalArrayToBe, ...finalArrayThemed]);
      beArray = {
        ...beArray,
        [release._id]: [...finalArrayToBe, ...finalArrayThemed],
      };
    });

  let Tiles = [];
  for (let i = 0; i < 10; i++) {
    console.log(i);
    Tiles.push({ active: false, no: i, val: "" });
  }

  beArray = { ...beArray, Tiles: Tiles };

  const SettleIt = (obj) => {
    const otherObj = obj;

    let finalNo = 0;
    const arrayOfB = [];
    const biggestNo = [];

    currentTeam &&
      Object.entries(otherObj).forEach((keu) => {
        if (keu[0] != "Tiles") {
          const newKeu = keu[1].filter((othr) => {
            if (!othr) return;
            if (!othr.type) {
              return othr;
            }
          });

          biggestNo.push(newKeu.length);
        }
      });

    currentTeam &&
      Object.entries(otherObj).forEach((keu) => {
        if (keu[0] != "Tiles") {
          if (
            keu[1].length !=
            biggestNo.sort(function (a, b) {
              return b - a;
            })[0]
          ) {
            arrayOfB.push(keu[0]);
          }
        }
      });

    arrayOfB.forEach((item) => {
      const times =
        biggestNo.sort(function (a, b) {
          return b - a;
        })[0] - otherObj[item].length;

      for (let i = 0; i < times; i++) {
        const unqiueKey = uuidv4();
        otherObj[item].push({ type: "Dud", _id: unqiueKey });
      }
    });

    return otherObj;
  };

  let finalBeARRAY;

  if (currentTeam) {
    if (typeof currentTeam[0].Map === "object") {
      finalBeARRAY = currentTeam[0].Map;
    } else {
      finalBeARRAY = beArray;
    }
  }

  const [testArray, setTestArray] = useState(SettleIt(finalBeARRAY));
  /*  console.log("please", SettleIt(beArray)); */
  const removeFromList = (list, index) => {
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

    if (result.source.droppableId != result.destination.droppableId) return;
    const listCopy = { ...testArray };

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

    setTestArray(listCopy);
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId != result.destination.droppableId) return;
    console.log(result.source.droppableId, result.destination.droppableId);

    const newItems = [...testArray[result.source.droppableId]];

    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setTestArray((prev) => {
      return { ...prev, [result.source.droppableId]: newItems };
    });
  }

  return (
    <div className=" w-fit h-screen">
      <ToastContainer></ToastContainer>
      <div className="text-4xl mt-12 font-Josefin lg:hidden text-gray-300 border-b border-green-400">
        Story Map
      </div>
      <div className="lg:hidden">
        Please Switch to a bigger screen to access this feature.
      </div>

      {currentTeam && (
        <div className="h-screen p-4  pt-16 lg:block hidden">
          <div className="text-4xl mb-8 font-Josefin text-gray-300 border-b border-green-400">
            Story Map
          </div>

          <div className="flex absolute top-16 right-4">
            <button
              onClick={() => {
                launchTutorial();
              }}
              className=" font-Josefin mr-4 flex items-center justify-center bg-indigo-800 text-white p-1 rounded"
            >
              Read Tutorial {TutorialIcon("fill-white")}
            </button>
            <button
              onClick={async () => {
                setSavedStory(true);
                const newM = await saveMap(testArray);
                if (newM) {
                  setSavedStory(false);
                }
              }}
              className=" lg:flex hidden  text-white mr-4 top-20 rounded-lg font-Josefin text-sm bg-indigo-800 p-2"
            >
              {Logo(
                `${
                  savedStory ? "block" : "hidden"
                } animate-spin fill-white mr-2`
              )}{" "}
              Save Current State
            </button>

            <button
              onClick={() => {
                setTestArray((prev) => {
                  const numb = prev.Tiles.length;
                  return {
                    ...prev,
                    Tiles: [
                      ...prev.Tiles,
                      { active: false, no: numb, val: "" },
                    ],
                  };
                });
              }}
              className=" lg:flex hidden right-4 text-white rounded-lg font-Josefin text-sm bg-indigo-800 p-2"
            >
              Add New Theme Row
            </button>
          </div>
          <div className="flex items-center font-Josefin text-gray-400 text-3xl ml-6">
            Time {sideArrow}
          </div>
          <div className="rotate-90 absolute -ml-12 flex mt-16 items-center justify-center font-Josefin text-gray-400 text-3xl">
            Priority {sideArrow}
          </div>
          <StoryMapRender
            Tiles={testArray.Tiles}
            onDragEnd={onDragEnd}
            testArray={testArray}
            setFunction={setTestArray}
          ></StoryMapRender>
        </div>
      )}
      {/* <div className="relative hidden lg:block">
        {!currentTeam && (
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(testArray).map((entry) => {
              if (entry[0] === "Tiles") {
                return (
                  <Droppable
                    droppableId={entry[0]}
                    direction="horizontal"
                    key={entry[0]}
                  >
                    {(provided) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          key={entry[0]}
                          className="lg:flex hidden border-b bg-white w-full ml-0 z-30 pb-2 pt-2"
                        >
                          {entry[1].map((item, index) => {
                            console.log("eee", item);
                            return (
                              <Draggable
                                draggableId={String(item.no)}
                                index={index}
                                key={String(item.no)}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      key={String(item.no)}
                                      className={`border ${
                                        item.active ? "border-indigo-800" : ""
                                      }  border-t-8  ml-4 h-16 rounded-lg w-32 flex duration-300  justify-center items-center`}
                                    >
                                      {" "}
                                      <input
                                        placeholder={`${
                                          item.active ? item.val : "Input Theme"
                                        }`}
                                        className={`text-center ${
                                          item.active
                                            ? "placeholder:text-gray-600"
                                            : "placeholder:text-white"
                                        } placeholder:duration-300 hover:placeholder:text-gray-300 rounded-lg outline-gray-100 w-24 h-6 font-Josefin`}
                                        key={String(item.no)}
                                        onChange={(e) => {
                                          setTestArray((prev) => {
                                            const Tiles = prev.Tiles.map(
                                              (ma) => {
                                                if (item.no === ma.no) {
                                                  return {
                                                    active: ma.active,
                                                    no: ma.no,
                                                    val: e.target.value,
                                                  };
                                                } else {
                                                  return ma;
                                                }
                                              }
                                            );
                                            const finalTiles = Tiles.map(
                                              (tile) => {
                                                if (tile.val) {
                                                  return {
                                                    active: true,
                                                    no: tile.no,
                                                    val: tile.val,
                                                  };
                                                } else {
                                                  return {
                                                    active: false,
                                                    no: tile.no,
                                                    val: tile.val,
                                                  };
                                                }
                                              }
                                            );
                                            return {
                                              ...prev,
                                              Tiles: finalTiles,
                                            };
                                          });
                                        }}
                                      ></input>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                        </div>
                      );
                    }}
                  </Droppable>
                );
              }
            })}
          </DragDropContext>
        )}
      </div> */}
    </div>
  );
}
