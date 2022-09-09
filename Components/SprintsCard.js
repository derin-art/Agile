import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import StoryTeamCard from "./StoryTeamCard";
import { useState } from "react";
import { interpolateAs } from "next/dist/shared/lib/router/router";
import SprintCardDisplay from "./SprintCardDisplay";

export default function SprintCard({ name, duration, stories }) {
  console.log(name, duration, "mmmd");
  return (
    <div className={`h-[128px] border p-1 rounded-2xl shadow-sm`}>
      <div className="h-fit">
        <Droppable droppableId={name}>
          {(provided) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stories.length > 0 ? (
                  <div className="flex">
                    <div className="font-Josefin border w-fit h-full ml-1 mt-2 flex flex-col items-center justify-center">
                      <p> {name}</p>
                    </div>
                    {stories.map((item, index) => {
                      return (
                        <div key={index} className="ml-2 h-8 w-56">
                          <SprintCardDisplay
                            id={`${item._id}`}
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
                  <div className="border h-8 font-Josefin mt-4">
                    No stories added
                  </div>
                )}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
}
