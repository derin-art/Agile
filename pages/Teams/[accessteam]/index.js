import UserStory from "../../../Components/ProductOwner/UserStory";
import Release from "../../../Components/ProductOwner/Release";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useAuth } from "../../../Context/firebaseUserContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccessTeam() {
  const { CreateRelease, currentTeam } = useAuth();
  const [releaseName, setReleaseName] = useState("");
  return (
    <div className="mt-16 p-2 font-Josefin">
      <div>Start a release plan</div>
      <div className="flex">
        {" "}
        <button
          className="border border-indigo-800 bg-green-400 text-indigo-800 p-2 hover:text-indigo-900"
          onClick={() => {
            if (!releaseName) {
              toast.error("Name input required", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "text-sm",
              });
            }
          }}
        >
          Create a new Release
        </button>
        <div>
          {" "}
          <input
            onChange={(e) => {
              setReleaseName(e.target.value);
            }}
            placeholder="Name"
            className="border ml-2 p-2 border-green-400 text-indigo-800"
          ></input>
        </div>
      </div>
      <div className="mt-4">
        <Release></Release>
      </div>
      <ToastContainer></ToastContainer>

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
