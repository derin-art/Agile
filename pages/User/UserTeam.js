import { useState, useEffect } from "react";
import { useAuth } from "../../Context/firebaseUserContext";
import UserSprintCardDisplay from "../../Components/UserSprintCardDisplay";
import StoryTeamCard from "../../Components/StoryTeamCard";
import { data } from "autoprefixer";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import parseJson from "parse-json";
import { toast, ToastContainer } from "react-toastify";

export default function UserTeam() {
  const { currentJoinedTeam } = useAuth();

  let tutorialBool = "";
  if (typeof window !== "undefined") {
    tutorialBool = parseJson(window.localStorage.getItem("enableTutorial"));
  }

  const launchTutorial = () => {
    toast.info(
      <div>
        The sprints are organized and created by by the Product Owner but team
        members also play a role in coordinating their colleagues by picking up
        Stories and compeleting them. This data is updated and the team
        member(s) that is/are working on a story are then visible to all team
        members and the product owner. Click on the info Icon on the stories in
        the sprint to access this functionality.
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
    <div className="h-screen w-fit pt-12 md:ml-32 pb-12 p-2">
      <div className="md:hidden font-Josefin">
        Please Switch to a bigger screen to access this feature
      </div>
      <div className="h-full md:block hidden">
        <ToastContainer></ToastContainer>
        {currentJoinedTeam && (
          <div className="font-Josefin mt-4 ml-0 mb-4 bg-gray-200 p-2 border-green-400 text-3xl text-gray-600 border-b">
            Team {currentJoinedTeam[0].name}
          </div>
        )}
        {currentJoinedTeam && (
          <div>
            {currentJoinedTeam[0].teamData.sprints &&
              Object.entries(currentJoinedTeam[0].teamData.sprints).map(
                (item) => {
                  if (
                    !currentJoinedTeam[0].Release.find((release) => {
                      return release._id === item[0];
                    })
                  )
                    return;

                  const release = currentJoinedTeam[0].Release.filter(
                    (release) => {
                      return release._id === item[0];
                    }
                  );

                  const finalFilteredThemes = [];

                  release[0].agilePins.forEach((pin) => {
                    if (pin) {
                      if (
                        finalFilteredThemes.find(
                          (obj) => obj.name === pin.theme.name
                        )
                      )
                        return;
                      finalFilteredThemes.push(pin.theme);
                    }
                  });
                  return (
                    <div className="bg-gray-100 mb-8 border font-Josefin rounded-b-lg border-t-8">
                      <div className="text-2xl bg-gray-100 border-green-400 border-b p-2 text-gray-400">
                        Release {release[0].name}
                      </div>
                      <div className="flex p-2  border overflow-x-auto">
                        {finalFilteredThemes.map((theme) => {
                          return (
                            <div
                              className={`duration-200 border-${
                                theme.color === "indigo"
                                  ? "green-300"
                                  : theme.color
                              } bg-indigo-900 w-20 px-1 truncate border-l-4 border font-Josefin rounded hover:w-64 text-center text-sm mr-4 text-white`}
                            >
                              {theme.name}
                            </div>
                          );
                        })}
                      </div>
                      {Object.entries(item[1]).map((data) => {
                        if (data[0] === "unSelected") {
                          console.log(data[1]);
                          return (
                            <div className="mt-4 p-2">
                              <div className="text-gray-500 border-b ">
                                Un-Selected
                              </div>
                              <div className="mb-4 flex mt-2 max-w-[1000px] overflow-x-auto pb-2">
                                {data[1].map((unSelected) => {
                                  if (unSelected) {
                                    console.log(unSelected.name);
                                    return (
                                      <div
                                        key={unSelected._id}
                                        className="mr-2"
                                      >
                                        <StoryTeamCard
                                          color={unSelected.theme.color}
                                          criteria={
                                            unSelected.AcceptanceCriteria
                                          }
                                          name={unSelected.name}
                                          points={unSelected.storyPoints}
                                          priority={unSelected.PriorityRank}
                                          key={unSelected._id}
                                        ></StoryTeamCard>
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          );
                        } else {
                          return data[1].map((sprints) => {
                            if (sprints.stories) {
                              return (
                                <div className="p-2 border-t">
                                  <div className="text-gray-600 text-lg">
                                    {" "}
                                    Sprint {sprints.name}{" "}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {sprints.duration} Week(s)
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {sprints.sprintEndDate ? (
                                      <div className="flex">
                                        <p className="mr-2">
                                          {sprints.sprintStartDate}
                                        </p>
                                        <p className="mr-2">to</p>
                                        <p>{sprints.sprintEndDate}</p>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className=" mt-2 mb-4 flex max-w[1000px] overflow-x-auto">
                                    {sprints.stories.map((selected) => {
                                      return (
                                        <div
                                          key={selected._id}
                                          className="mr-2"
                                        >
                                          <UserSprintCardDisplay
                                            AcceptanceCriteria={
                                              selected.AcceptanceCriteria
                                            }
                                            PriorityRank={selected.PriorityRank}
                                            id={selected._id}
                                            name={selected.name}
                                            storyPoints={selected.storyPoints}
                                            theme={selected.theme}
                                            key={selected._id}
                                            entireObject={selected}
                                            releaseId={release[0]._id}
                                            inProgress={selected.inProgress}
                                            completed={selected.completed}
                                            AssignedTo={selected.AssignedTo}
                                          ></UserSprintCardDisplay>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            }
                          });
                        }
                      })}
                    </div>
                  );
                }
              )}
          </div>
        )}
      </div>
    </div>
  );
}
