import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import UserStoryCard from "../../../Components/ProductOwner/UserStory";
import StoryTeamCard from "../../../Components/StoryTeamCard";

export default function UserStory() {
  return (
    <div className="mt-16 md:ml-4">
      <div className="">
        <UserStoryCard></UserStoryCard>
        <DragDropContext>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Draggable draggableId="2" index={1}>
                  {(provided) => (
                    <li
                      index={1}
                      className="bg-green-300 m-2 w-fit"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      Heyyd
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="1" index={2}>
                  {(provided) => (
                    <li
                      index={2}
                      className="bg-green-300 m-2 w-fit"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      Heyy
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <StoryTeamCard name={"US24"}></StoryTeamCard>
    </div>
  );
}
