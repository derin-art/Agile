import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import StoryTeamCard from "./StoryTeamCard";
import { useState } from "react";
import { interpolateAs } from "next/dist/shared/lib/router/router";
import SprintCardDisplay from "./SprintCardDisplay";

export default function SprintCard({ name, duration, stories }) {
  console.log(name, duration, "mmmd");
  let totalStoryPoints = 0;
  stories.forEach((item) => {
    if (item) {
      totalStoryPoints = parseInt(item.storyPoints) + totalStoryPoints;
    }
  });
  return (
    <div
      className={`h-[165px] border rounded relative border-t-[20px]  bg-gray-100 bg-opacity-25 `}
    >
      <div className="absolute text-gray-700 -top-[19px] left-4 text-sm font-Josefin flex">
        <p className="mr-4">Sprint {name}</p>
        <p className="text-xs mt-1">
          Add to the sprint by dragging stories over it
        </p>
        <div className="ml-8">
          {" "}
          <p>{totalStoryPoints} Total Points</p>
        </div>
      </div>
      <p className="absolute right-16 -top-[20px] text-gray-700 text-sm font-Josefin">
        {duration}
        weeks
      </p>
      <div className="h-fit">
        <Droppable droppableId={name} key={name} direction="horizontal">
          {(provided) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-w-[1000px]  max-w-[1000px] h-[154px] overflow-x-auto"
              >
                {stories.length > 0 ? (
                  <div className="flex h-full">
                    {stories.map((item, index) => {
                      return (
                        <div key={index} className="ml-2  w-54">
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
