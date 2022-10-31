import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import ThemeCard from "./ThemeCard";
import Mapped from "./Mapped";

export default function StoryMapRender({
  onDragEnd,
  setFunction,
  Tiles,
  testArray,
}) {
  const downArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 16l-6-6h12z" />
    </svg>
  );

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
    <div className="p-4 h-5/6 ml-8 border  overflow-x-auto overflow-y-hidden max-w-[1300px] ">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="Tiles" direction="horizontal" key="Tiles">
          {(provided) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                key="Tiles"
                className="flex pl-4"
              >
                {Tiles.map((item, index) => {
                  return (
                    <Draggable
                      index={index}
                      key={String(item.no)}
                      draggableId={String(item.no)}
                    >
                      {(provided) => {
                        return (
                          <div
                            className="mr-4"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={String(item.no)}
                          >
                            <ThemeCard
                              active={item.active}
                              key={item.no}
                              item={item}
                              setFunction={setFunction}
                              val={item.val}
                            ></ThemeCard>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-5/6 overflow-auto mt-8">
          {Object.entries(testArray).map((entry) => {
            if (entry[0] != "Tiles") {
              return (
                <Mapped
                  Array={entry[1]}
                  allItems={testArray}
                  setFunction
                  key={entry[0]}
                  id={entry[0].toString()}
                ></Mapped>
              );
            }
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
