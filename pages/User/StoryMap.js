import { useAuth } from "../../Context/firebaseUserContext";
import StoryTeamCard from "../../Components/StoryTeamCard";
import Mapped from "../../Components/MappedUser";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import parseJson from "parse-json";
import "react-toastify/dist/ReactToastify.css";
import StoryMapRenderUser from "../../Components/StoryMapRenderUser";
import TutorialIcon from "../../public/TutorialIcon";

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

  return (
    <div className="pt-14 md:pl-24 h-screen p-2 w-fit">
      <ToastContainer></ToastContainer>
      <div className="md:hidden font-Josefin">
        Please Switch to a bigger screen to access this feature
      </div>
      <div className="h-full md:block hidden">
        <button
          onClick={() => {
            launchTutorial();
          }}
          className="absolute top-14 font-Josefin text-sm right-4 bg-indigo-800 text-white p-1 rounded flex items-center justify-center"
        >
          Show Tutorial {TutorialIcon("fill-white")}
        </button>
        <div className="text-3xl border-b pl-4 text-gray-300 border-green-400 font-Josefin mb-4">
          Story Map
        </div>
        <div className="flex items-center font-Josefin text-gray-400 text-3xl ml-6">
          Time {sideArrow}
        </div>
        <div className="rotate-90 absolute -ml-10 flex mt-16 items-center justify-center font-Josefin text-gray-400 text-3xl">
          Priority {sideArrow}
        </div>
        {currentJoinedTeam && (
          <StoryMapRenderUser
            Tiles={currentJoinedTeam[0].Map.Tiles}
            testArray={currentJoinedTeam[0].Map}
            key="StoryRenderUser"
          ></StoryMapRenderUser>
        )}
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
