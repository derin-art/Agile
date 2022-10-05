import { useState } from "react";
import { useAuth } from "../../Context/firebaseUserContext";
import UserSprintCardDisplay from "../../Components/UserSprintCardDisplay";
import StoryTeamCard from "../../Components/StoryTeamCard";
import { data } from "autoprefixer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserTeam() {
  const { currentJoinedTeam } = useAuth();
  console.log("coule", Object.entries(currentJoinedTeam[0].teamData.sprints));
  return (
    <div className="h-screen w-fit pt-12 ml-32 pb-12">
      <div className="font-Josefin mt-4 ml-0 mb-4 text-2xl">
        Team {currentJoinedTeam[0].name}
      </div>
      {currentJoinedTeam[0].teamData.sprints &&
        Object.entries(currentJoinedTeam[0].teamData.sprints).map((item) => {
          console.log(
            "filt",
            currentJoinedTeam[0].Release.filter((release) => {
              return release._id === item[0];
            })
          );

          if (
            !currentJoinedTeam[0].Release.find((release) => {
              return release._id === item[0];
            })
          )
            return;

          const release = currentJoinedTeam[0].Release.filter((release) => {
            return release._id === item[0];
          });

          const finalFilteredThemes = [];

          release[0].agilePins.forEach((pin) => {
            if (pin) {
              if (
                finalFilteredThemes.find((obj) => obj.name === pin.theme.name)
              )
                return;
              finalFilteredThemes.push(pin.theme);
            }
          });
          console.log("filTHHEN", finalFilteredThemes);

          return (
            <div className="bg-gray-100 mb-8 border font-Josefin rounded">
              <div className="text-lg border-b p-2">
                Release {release[0].name}
              </div>
              <div className="flex p-2">
                {finalFilteredThemes.map((theme) => {
                  return (
                    <div
                      className={`duration-200 border-${
                        theme.color === "indigo" ? "green-300" : theme.color
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
                      Un-Selected
                      <div className="mb-4 flex mt-2">
                        {data[1].map((unSelected) => {
                          if (unSelected) {
                            console.log(unSelected.name);
                            return (
                              <div key={unSelected._id} className="mr-2">
                                <StoryTeamCard
                                  color={unSelected.theme.color}
                                  criteria={unSelected.AcceptanceCriteria}
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
                  console.log("das", data[1]);
                  return data[1].map((sprints) => {
                    if (sprints.stories) {
                      return (
                        <div className="p-2 border-t">
                          Sprint {sprints.name}{" "}
                          <div>{sprints.duration} Week(s)</div>
                          <div className=" mt-2 mb-4 flex">
                            {sprints.stories.map((selected) => {
                              return (
                                <div key={selected._id} className="mr-2">
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
        })}
      <ToastContainer></ToastContainer>
    </div>
  );
}
