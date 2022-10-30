import { useAuth } from "../../Context/firebaseUserContext";
import StoryTeamCard from "../../Components/StoryTeamCard";
import Mapped from "../../Components/MappedUser";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import parseJson from "parse-json";
import "react-toastify/dist/ReactToastify.css";

export default function StoryMap() {
  const { currentJoinedTeam } = useAuth();

  let tutorialBool = "";
  if (typeof window !== "undefined") {
    tutorialBool = parseJson(window.localStorage.getItem("enableTutorial"));
  }

  const launchTutorial = () => {
    toast.info(
      <div>
        This is simply a rendering of the team story map that the user is a
        member of. Unlike from the Product Owner, Team members do not have the
        ability to drag and drop or edit this data.
      </div>,
      {
        autoClose: false,
        className: "text-sm",
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };

  useEffect(() => {
    launchTutorial();
  }, []);

  return (
    <div className="pt-14 md:pl-24 h-full p-2">
      <ToastContainer></ToastContainer>
      <div className="md:hidden font-Josefin">
        Please Switch to a bigger screen to access this feature
      </div>
      <div className="h-full md:block hidden">
        <div className="absolute top-12 font-Josefin text-sm left-[110px]">
          Time ---›
        </div>
        <button
          onClick={() => {
            launchTutorial();
          }}
          className="absolute top-12 font-Josefin text-sm right-4"
        >
          Show Tutorial
        </button>
        <div className="absolute z-30 top-24 font-Josefin text-sm rotate-90 left-[72px]">
          Priority---›
        </div>
        {currentJoinedTeam &&
          Object.entries(currentJoinedTeam[0].Map).map((item) => {
            if (item[0] === "Tiles") {
              return (
                <div
                  key={"Tiles"}
                  className="flex font-Josefin border-b pb-4 bg-white w-fit z-20 absolute top-16 z-30"
                >
                  {item[1].map((tiles) => {
                    return (
                      <div
                        key={tiles.no}
                        className={`border  truncate ${
                          tiles.active ? "border-indigo-800" : ""
                        }  border-t-8 w-32 px-1 ml-4 h-16 rounded-lg flex duration-300  justify-center items-center`}
                      >
                        {tiles.val}
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        <div className="pt-8 mt-16 h-4/6 overflow-y-auto w-fit">
          {currentJoinedTeam &&
            Object.entries(currentJoinedTeam[0].Map).map((item) => {
              if (item[0] != "Tiles") {
                return (
                  <Mapped
                    Array={item[1]}
                    id={item[0]}
                    key={item[0]}
                    name={item[0]}
                  ></Mapped>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

/*           if (!arrItem) return;
                if (arrItem.name) {
                  return (
                    <div className="">
                      <div className="w-32 truncate text-xs overflow-auto hover:text-clip">
                        No theme
                      </div>
                      <StoryTeamCard
                        name={arrItem.name}
                        criteria={arrItem.AcceptanceCriteria}
                        points={arrItem.storyPoints}
                        priority={arrItem.PriorityRank}
                        key={arrItem._id}
                        color={arrItem.theme.color}
                      ></StoryTeamCard>
                    </div>
                  );
                } else if (arrItem.tName) {
                  <div className="w-32 truncate text-xs overflow-auto hover:text-clip">
                    {arrItem.tName}
                  </div>;
                  return arrItem.pins.map((story) => {
                    return (
                      <div key={story._id} className="mb-2">
                        <StoryTeamCard
                          key={story._id}
                          points={story.storyPoints}
                          criteria={story.AcceptanceCriteria}
                          name={story.name}
                          priority={story.PriorityRank}
                          color={story.theme.color}
                        ></StoryTeamCard>
                      </div>
                    );
                  });
                } else {
                  return (
                    <div
                      className="h-24 w-32 p-2 bg-red-100 opacity-0"
                      key={arrItem._id}
                    ></div>
                  );
                } */
