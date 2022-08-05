import UserStory from "../../Components/ProductOwner/UserStory";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Release from "../../Components/ProductOwner/Release";
import axios from "axios";

export default function CreateTeam() {
  return (
    <div className="mt-16 p-2 font-Josefin">
      <div>Start a release plan</div>
      <button className="border">Create a new Release</button>
      <Release></Release>

      <div className="border hidden">
        <UserStory></UserStory>
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
    </div>
  );
}
