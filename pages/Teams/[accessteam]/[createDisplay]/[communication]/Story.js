import { useAuth } from "../../../../../Context/firebaseUserContext";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import Mapped from "../../../../../Components/Mapped";
import { v4 as uuidv4 } from "uuid";
import Logo from "../../../../../public/logo";

export default function Story() {
  const { currentTeam, saveMap } = useAuth();
  const [savedStory, setSavedStory] = useState(false);
  const [themes, setThemes] = useState([]);

  const [themeName, setThemeName] = useState("");
  const [allArray, setAllArray] = useState({ notUsed: [] });

  const Test = [
    { name: "1", id: 1, theme: "Mn" },
    { name: "2", id: 2, theme: "Yours" },
    { name: "3", id: 3, theme: "None" },
    { name: "4", id: 4, theme: "None" },
    { name: "5", id: 5, theme: "Yours" },
    { name: "6", id: 6, theme: "Mine" },
    { name: "7", id: 7, theme: "None" },
    { name: "8", id: 8, theme: "Mine" },
  ];

  let TestScenc = [
    { name: "1", id: 1, theme: "None" },
    { name: "4", id: 4, theme: "None" },
    { name: "7", id: 7, theme: "None" },
    {
      tName: "Yours",
      pins: [
        { name: "2", id: 2, theme: "Yours" },
        { name: "3", id: 3, theme: "Yours" },
        { name: "5", id: 5, theme: "Yours" },
      ],
    },
    {
      tName: "Mine",
      pins: [
        { name: "8", id: 8, theme: "Mine" },
        { name: "6", id: 6, theme: "Mine" },
      ],
    },
  ];

  Test.forEach((item) => {
    TestScenc.forEach((scenc) => {
      if (scenc.tName) {
        scenc.pins.forEach((pin) => {
          if (pin.id === item.id) {
            if (pin.theme != item.theme) {
              const newArra = scenc.pins.filter((nw) => {
                return nw.id != pin.id;
              });
              const element = scenc.pins.filter((nw) => {
                return nw.id === pin.id;
              });

              element[0].theme = item.theme;

              scenc.pins = newArra;

              if (element[0].theme === "None") {
                TestScenc.push(element[0]);
                return;
              }

              if (
                TestScenc.find((found) => {
                  return found.tName === element[0].theme;
                })
              ) {
                TestScenc.forEach((po) => {
                  if (po.tName === element[0].theme) {
                    po.pins = [...po.pins, element[0]];
                  }
                });
              } else {
                TestScenc.push({ tName: element[0].theme, pins: [element[0]] });
              }
            }
          }
        });
      } else {
        if (item.id === scenc.id) {
          if (item.theme != scenc.theme) {
            const NewTest = TestScenc.filter((newT) => {
              return newT.id != scenc.id;
            });
            const element = TestScenc.filter((newT) => {
              return newT.id === scenc.id;
            });
            element[0].theme = item.theme;
            TestScenc = NewTest;
            if (
              TestScenc.find((Sc) => {
                return Sc.tName === element[0].theme;
              })
            ) {
              TestScenc.forEach((pp) => {
                if (pp.tName === element[0].theme) {
                  pp.pins = [...pp.pins, element[0]];
                }
              });
            } else {
              TestScenc.push({ tName: element[0].theme, pins: [element[0]] });
            }
          }
        }
      }
    });
  });

  console.log("dnnnnn", TestScenc);
  let beArray = {};

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

    const arrayToBe = release.agilePins.map((item) => {
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

  console.log(beArray);

  const SettleIt = (obj) => {
    const otherObj = obj;

    let finalNo = 0;
    const arrayOfB = [];
    const biggestNo = [];

    Object.entries(otherObj).forEach((keu) => {
      console.log("mmsss", keu);

      if (keu[0] != "Tiles") {
        const newKeu = keu[1].filter((othr) => {
          if (!othr) return;
          if (!othr.type) {
            return othr;
          }
        });
        console.log("tman", keu[1].length, newKeu.length, newKeu);
        biggestNo.push(newKeu.length);
      }
    });

    console.log("d", Object.entries(otherObj));
    Object.entries(otherObj).forEach((keu) => {
      console.log(
        "mmsss",
        biggestNo.sort(function (a, b) {
          return b - a;
        })[0]
      );
      if (keu[0] != "Tiles") {
        console.log(
          keu[1].length !=
            biggestNo.sort(function (a, b) {
              return b - a;
            })[0]
        );
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

    console.log("smsm", arrayOfB);

    arrayOfB.forEach((item) => {
      console.log(
        "subah",
        otherObj[item].filter((oth) => {
          if (!oth) return;
          if (!oth.type) {
            return oth;
          }
        }),
        biggestNo.sort(function (a, b) {
          return b - a;
        })[0]
      );
      const times =
        biggestNo.sort(function (a, b) {
          return b - a;
        })[0] - otherObj[item].length;
      console.log("times", times);
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
    console.log("mmsdsd", beArray);
    finalBeARRAY = beArray;
  }

  const [testArray, setTestArray] = useState(SettleIt(finalBeARRAY));
  /*  console.log("please", SettleIt(beArray)); */
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
    console.log("MM", result.source.droppableId);
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

  /*  const [items, setItems] = useState(baseData);

  function onDragEnd(result) {
    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  } */

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId != result.destination.droppableId) return;
    console.log(result.source.droppableId, result.destination.droppableId);

    const newItems = [...testArray[result.source.droppableId]];
    console.log("ss", newItems);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    console.log("mm", newItems);

    setTestArray((prev) => {
      console.log("sssA", { ...prev, [result.source.droppableId]: newItems });
      return { ...prev, [result.source.droppableId]: newItems };
    });
  }

  return (
    <div className=" w-fit pt-24 h-screen scrollbar">
      <div className="lg:hidden font-Josefin">
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
      <div className="relative">
        <div className="pl-4 font-Josefin -mb-2 text-xs">
          Time —————————›
          <div className="absolute rotate-90 -left-7 top-10">Priority ———›</div>
        </div>
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
                        className="lg:flex hidden mt-3 border-b bg-white w-full ml-0 z-30 pb-2 pt-2"
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
                                      } placeholder:duration-300 hover:placeholder:text-gray-300 rounded-lg outline-gray-100 w-24 h-8 font-Josefin`}
                                      key={String(item.no)}
                                      onChange={(e) => {
                                        setTestArray((prev) => {
                                          const Tiles = prev.Tiles.map((ma) => {
                                            if (item.no === ma.no) {
                                              return {
                                                active: ma.active,
                                                no: ma.no,
                                                val: e.target.value,
                                              };
                                            } else {
                                              return ma;
                                            }
                                          });
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
                                          console.log("dd", finalTiles);
                                          return { ...prev, Tiles: finalTiles };
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
      </div>
      <div className="h-5/6 overflow-y-auto w-fit pt-8 lg:block hidden">
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
      </div>
    </div>
  );
}
