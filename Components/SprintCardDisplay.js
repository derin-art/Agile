import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";

export default function SprintCardDisplay({ id, index }) {
  const [infoOpen, setInfoOpen] = useState(true);
  return (
    <div className="h-fit rounded-lg w-fit font-Josefin relative overflow-x-hidden border bg-indigo-200 rounded-sm border-t-4 border-green-300">
      <Draggable draggableId={id} index={index}>
        {(provided) => {
          return (
            <div>
              <div
                index={index}
                className="p-1 mt-2 overflow-x-hidden rounded-sm h-full w-full"
                key={id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                id={id}
              >
                <div
                  className={`h-24 w-full absolute bg-red-400 duration-300 ${
                    infoOpen ? "left-full" : "left-0"
                  }`}
                >
                  <button
                    onClick={() => {
                      setInfoOpen((prev) => !prev);
                    }}
                    className="z-30 p-2"
                  >
                    close
                  </button>
                </div>
                <button
                  onClick={() => {
                    setInfoOpen((prev) => !prev);
                  }}
                  className="z-30"
                >
                  open
                </button>
                <div>U1</div>
                <input></input>
                Matttttt
              </div>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
}
