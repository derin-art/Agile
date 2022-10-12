import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import StoryTeamCard from "./StoryTeamCard";
import { useState } from "react";
import { interpolateAs } from "next/dist/shared/lib/router/router";
import SprintCardDisplay from "./SprintCardDisplay";

export default function SprintCard({
  name,
  duration,
  stories,
  sprintEndDate,
  sprintStartDate,
}) {
  const typhonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className="fill-green-500"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M17.654 1.7l-2.782 2.533a9.137 9.137 0 0 1 3.49 1.973c3.512 3.2 3.512 8.388 0 11.588-2.592 2.36-6.598 3.862-12.016 4.506l2.782-2.533a9.137 9.137 0 0 1-3.49-1.973c-3.512-3.2-3.533-8.369 0-11.588C8.23 3.846 12.237 2.344 17.655 1.7zM12 8c-2.485 0-4.5 1.79-4.5 4s2.015 4 4.5 4 4.5-1.79 4.5-4-2.015-4-4.5-4z" />
    </svg>
  );
  console.log(name, duration, sprintEndDate, sprintStartDate, "mmmd");
  let totalStoryPoints = 0;
  stories.forEach((item) => {
    if (item) {
      totalStoryPoints = parseInt(item.storyPoints) + totalStoryPoints;
    }
  });
  return (
    <div
      className={`h-[185px] border rounded-t-none border-green-400 rounded-lg p-2 relative border-t-[30px] bg-gray-100 bg-opacity-25 `}
    >
      <div className="absolute text-white -top-[23px] left-4 text-sm font-Josefin flex">
        <p className="mr-4 text-green-700 uppercase flex">
          <p className="-mt-[2px] mr-1"> {typhonIcon}</p>Sprint {name}
        </p>
        <div className="ml-4 mr-4 text-white">
          {" "}
          <p>{totalStoryPoints} Total Points</p>
        </div>
        <p className="text-xs mt-1">
          Add to the sprint by dragging stories over it
        </p>
        {sprintEndDate ? (
          <div className="text-green-600 flex ml-4">
            <p className="mr-2">{sprintStartDate}</p>
            <p className="mr-2">To</p>
            <p className="">{sprintEndDate}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="absolute right-16 -top-[20px] text-white text-sm font-Josefin">
        {duration}
        weeks
      </p>
      <div className="h-fit ">
        <Droppable droppableId={name} key={name} direction="horizontal">
          {(provided) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-w-[1000px] max-w-[1000px]  h-[160px] overflow-x-auto"
              >
                {stories.length > 0 ? (
                  <div className="flex h-full -mt-1">
                    {stories.map((item, index) => {
                      return (
                        <div key={index} className="ml-4  w-54">
                          <SprintCardDisplay
                            id={item._id}
                            index={index}
                            AcceptanceCriteria={item.AcceptanceCriteria}
                            PriorityRank={item.PriorityRank}
                            storyPoints={item.storyPoints}
                            key={index}
                            name={item.name}
                            DateCreated={item.DateCreated}
                            theme={item.theme}
                            AssignedTo={item.AssignedTo}
                            completed={item.completed}
                            inProgress={item.inProgress}
                          ></SprintCardDisplay>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="ml-4 h-8 font-Josefin mt-4 w-96">
                    No stories added
                  </div>
                )}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
}
