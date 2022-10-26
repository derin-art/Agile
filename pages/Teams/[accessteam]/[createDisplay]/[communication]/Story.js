import { useAuth } from "../../../../../Context/firebaseUserContext";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import Mapped from "../../../../../Components/Mapped";
import { v4 as uuidv4 } from "uuid";
import Logo from "../../../../../public/logo";
import { toast, ToastContainer } from "react-toastify";
import parseJson from "parse-json";

export default function Story() {
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

  if (typeof currentTeam[0].Map === "object") {
    finalBeARRAY = currentTeam[0].Map;
  } else {
    finalBeARRAY = beArray;
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
    <div className=" w-fit pt-24 h-screen">
      <ToastContainer></ToastContainer>
      <div className="lg:hidden font-Josefin p-2">
        Please switch to to a bigger screen to access this feature
      </div>
      <button
        onClick={async () => {
          setSavedStory(true);
          const newM = await saveMap(testArray);
          if (newM) {
            setSavedStory(false);
          }
        }}
        className="fixed lg:flex hidden -mt-10 ml-4 text-white rounded-lg font-Josefin text-sm bg-indigo-800 p-2"
      >
        {Logo(
          `${savedStory ? "block" : "hidden"} animate-spin fill-white mr-2`
        )}{" "}
        Save Current State
      </button>
      <button
        onClick={() => {
          launchTutorial();
        }}
        className="right-48 top-16 fixed font-Josefin"
      >
        Show Tutorial
      </button>
      <button
        onClick={() => {
          setTestArray((prev) => {
            const numb = prev.Tiles.length;
            return {
              ...prev,
              Tiles: [...prev.Tiles, { active: false, no: numb, val: "" }],
            };
          });
        }}
        className="fixed lg:flex hidden -mt-10 right-4 text-white rounded-lg font-Josefin text-sm bg-indigo-800 p-2"
      >
        Add New Theme Row
      </button>
      <div className="relative hidden lg:block">
        <div className="pl-4 font-Josefin -mb-2 text-xs">
          Time —————————›
          <div className="absolute rotate-90 -left-7 top-10">Priority ———›</div>
        </div>
        {currentTeam && (
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
      </div>
      <div className="h-4/6 overflow-y-auto w-fit pt-8 lg:block hidden">
        {currentTeam && (
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(testArray).map((entry) => {
              if (entry[0] != "Tiles") {
                return (
                  <Mapped
                    Array={entry[1]}
                    allItems={testArray}
                    setFunction={setTestArray}
                    key={entry[0]}
                    id={entry[0].toString()}
                  ></Mapped>
                );
              }
            })}
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
