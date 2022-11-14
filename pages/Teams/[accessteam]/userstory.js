import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Release from "../../../Components/ProductOwner/Release";
import UserStoryCard from "../../../Components/ProductOwner/UserStory";
import StoryTeamCard from "../../../Components/StoryTeamCard";
import { useAuth } from "../../../Context/firebaseUserContext";
import swordIcon from "../../../public/swordIcon";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { async, map } from "@firebase/util";
import Logo from "../../../public/logo";
import { motion } from "framer-motion";
import parseJson from "parse-json";
import TutorialIcon from "../../../public/TutorialIcon";

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
    deletePin,
  } = useAuth();

  const allSaveThemes = [];

  const [createStoryMenu, setCreateStoryMenu] = useState(false);
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

  const launchTutorial = () => {
    toast.info(
      <div>
        User stories are an essential part of Releases. They are the tasks that
        must be completed before a release can be released of launched. At the
        right hand corner is button to open the create User story menu. Stories
        require information; the Acceptance criteria which is used to judge when
        the task is complete, the Priority which is judged to two metrics; value
        to the app and the risk of attempting the task, through this metrics the
        priority of each user story is decided, green indicating a low risk task
        with high value and at the other end of the spectrum red indicating a
        high risk task with low value. Another vital metric to judge User
        stories are their story points which indicate the amount of work
        contained or necessary to complete a task, the higher the number, the
        more the work. When the number exceeds 21, the story should be broken
        into smaller stories and made/organized into an Epic.
      </div>,
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
        className: "text-sm",
      }
    );
  };

  let tutorialBool = "";
  if (typeof window !== "undefined") {
    tutorialBool = parseJson(window.localStorage.getItem("enableTutorial"));
  }

  useEffect(() => {
    if (!Themes[0]) {
      SetTheme(themes);
    }
    if (!Themes[1]) {
      SetTheme(themes);
    }
    tutorialBool && launchTutorial();
  }, []);

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

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === "names") {
    }
    const newItems = [...currentPinsOpen.allPins];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    const modefiedNewitems = { allPins: newItems };
    setCurrentPinsOpen((prev) => {
      return modefiedNewitems;
    });
  }

  const onDragEndFinal = (result) => {
    console.log(currentPinsOpen);
    if (!result.destination) {
      return;
    }

    const listCopy = { ...currentPinsOpen };

    const arrayKey = result.source.droppableId;

    const sourceList = listCopy[arrayKey];

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

    setCurrentPinsOpen(listCopy);
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
      <div className="md:hidden font-Josefin p-2">
        Please Switch to a bigger screen to access this feature
      </div>
      <div className="w-full relative  hidden md:block">
        <p className="text-sm font-Josefin">Begin by creating user stories</p>
        <div className="">
          <button
            onClick={() => {
              setCreateStoryMenu((prev) => !prev);
            }}
            className="p-2 px-6 bg-indigo-800 text-white text-sm font-Josefin absolute right-2 -top-14 rounded"
          >
            Add User Story
          </button>
          <button
            onClick={() => {
              launchTutorial();
            }}
            className="texts-sm right-40 -top-14 absolute font-Josefin text-white bg-indigo-800 flex items-center justify-center p-1 rounded"
          >
            Read Tutorial {TutorialIcon("fill-white")}
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={createStoryMenu ? { translateY: 20, opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className={`border rounded-2xl shadow z-30 pb-2 bg-white absolute  -top-8 right-2 ${
            createStoryMenu ? "" : "hidden"
          }`}
        >
          <UserStoryCard></UserStoryCard>
        </motion.div>
      </div>
      <div className=" flex -z-50  hidden md:flex">
        <div className="flex flex-col">
          <ToastContainer></ToastContainer>
          <div className=" border-b-2 border-l-2 w-full ml-2 mr-1 rounded-bl-2xl flex p-8">
            <DragDropContext onDragEnd={onDragEndFinal}>
              <div className="flex-col mr-4 font-Josefin relative hidden">
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
                  className="p-2 px-4 z-50 font-Josefin bg-indigo-800 text-white rounded "
                >
                  Create a New Epic{" "}
                </button>
                <div className="-z-50 mt-4">
                  <p className="-mb-2 mt-2 text-black">Input Epic Name</p>
                  <input
                    className={`border p-1 -z-50 mb-4 mt-2 -z-50 rounded border-l-4 border-${themeColor}`}
                    placeholder="Epic Name"
                    onChange={(e) => {
                      setThemeName(e.target.value);
                    }}
                  ></input>
                  <div className="flex flex-col mb-2 text-gray-500">
                    <p className="-mb-2 text-black">Select Epic Color</p>
                  </div>
                  <motion.div
                    initial={{ height: "45px" }}
                    whileHover={{ height: "160px" }}
                    transition={{ duration: 0.5 }}
                    className="w-44 scrollbar-thin border p-3 rounded-sm "
                  >
                    {colorCOdes()}
                  </motion.div>
                </div>

                <div className="absolute -bottom-2 flex items-center">
                  <button
                    className="bg-indigo-800 p-2 px-3 text-white rounded shadow hover:text-indigo-800 hover:border border-indigo-800 hover:bg-white"
                    onClick={async () => {
                      setDataSaved((prev) => ({ ...prev, loading: true }));

                      const editedPinsWithEpics = Object.entries(
                        currentPinsOpen
                      ).map((item, index) => {
                        if (item) {
                          return item[1].map((pins) => {
                            if (pins) {
                              const itemColor = Themes.filter((theme) => {
                                if (theme) {
                                  return theme.name === item[0];
                                }
                              });

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

                      setDataSaved((prev) => ({
                        loading: false,
                        status: response.status,
                      }));
                    }}
                  >
                    Save Current State
                  </button>
                  {dataSaved.loading &&
                    Logo("ml-2 fill-green-400 animate-spin")}
                </div>
              </div>

              <div className="flex lg:w-[1000px] max-w-[1000px] h-[500px] overflow-auto scrollbar-thin  scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <div className="flex ml-2">
                  {currentPinsOpen &&
                    Object.entries(currentPinsOpen).map((epic) => {
                      if (epic[0]) {
                        const themeObject = themes.filter(
                          (item) => item.name === epic[0]
                        );

                        return (
                          <div key={epic[0].toString()} className="relative">
                            <div className="absolute -top-0 z-40 text-gray-700 bg-gray-100 bg-white h-8 truncate border-b border-l w-full font-Josefin">
                              <div className="w-48 truncate px-2 text-center mt-1">
                                {epic[0] === "Notheme" ? "No Epic" : epic[0]}
                              </div>
                            </div>
                            <Droppable droppableId={epic[0].toString()}>
                              {(provided) => {
                                return (
                                  <ul
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`h-96 overflow-auto pt-8 w-48 flex-col flex items-center mr-2 rounded-bl-2xl    ${
                                      themeObject[0]
                                        ? `border-${themeObject[0].color}`
                                        : ""
                                    } border-l border-b `}
                                  >
                                    {currentPinsOpen[epic[0]].map(
                                      (item, index) => {
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
                                                    deleteFunction={deletePin}
                                                    deleteVisible={true}
                                                    id={{
                                                      pinId: item._id,
                                                      pinThemeName:
                                                        item.theme.name,
                                                    }}
                                                    name={item.name}
                                                    criteria={
                                                      item.AcceptanceCriteria
                                                    }
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
                                      }
                                    )}
                                  </ul>
                                );
                              }}
                            </Droppable>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              <div className="flex flex-col ml-4 border-l max-h-[500px] overflow-auto scrollbar-thin items-center w-40 ">
                <div className="mb-2 font-Josefin self-start ml-2 text-xl text-gray-700">
                  EPICS
                  <div className="text-xs">
                    Drag a User story over an epic to add them to the epic.
                    click the save current state button to save it.
                  </div>
                </div>
                {Themes &&
                  Themes.map((item) => {
                    if (item) {
                      return (
                        <Droppable droppableId={item.name} key={item.name}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                className={`border py-8 flex items-center border-${
                                  item.color
                                } border-r-8 mb-8 p-6 border-2 text-gray-800 rounded font-Josefin duration-200 mr-4 w-32 truncate ${
                                  snapshot.isDraggingOver ? "scale-110" : ""
                                }`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                key={item.name}
                                onClick={() => {
                                  setCurrentEpicRevised((prev) => {
                                    if (item.name === "Notheme")
                                      return "allPins";
                                    else return item.name;
                                  });
                                }}
                              >
                                <div className="w-20 truncate">{item.name}</div>
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
