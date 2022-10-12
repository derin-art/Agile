import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import StoryTeamCard from "./StoryTeamCard";
import { useAuth } from "../Context/firebaseUserContext";

export default function Mapped({ Array, id, allItems, setFunction, name }) {
  console.log("k", Array);
  const { currentTeam } = useAuth();

  const releaseUsed = currentTeam[0].Release.filter(
    (release) => release._id === id
  );

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const newItems = [...Array];
    console.log("ss", newItems);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    console.log("mm", newItems);

    setFunction((prev) => {
      console.log("sssA", { ...prev, [id]: newItems });
      return { ...prev, [id]: newItems };
    });
  }

  return (
    <div className="h-fit w-fit mb-4  text-lg font-Josefin bg-gray-100 pt-2 pb-2 pr-2">
      <div className="w-full border-b pl-4 text-2xl text-gray-500  border-green-400">
        Release {releaseUsed[0].name}
      </div>
      <Droppable droppableId={id} direction="horizontal" key={id}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex border border-white h-fit"
            >
              {Array.map((item, index) => {
                if (!item) return;
                if (item.name) {
                  console.log("str", index);
                  return (
                    <Draggable
                      draggableId={String(item._id)}
                      index={index}
                      key={String(item._id)}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={item._id}
                            className=" ml-4"
                          >
                            <div className="w-32 truncate text-xs overflow-auto hover:text-clip">
                              No theme
                            </div>
                            <StoryTeamCard
                              name={item.name}
                              criteria={item.AcceptanceCriteria}
                              points={item.storyPoints}
                              priority={item.PriorityRank}
                              key={item._id}
                              color={item.theme.color}
                            ></StoryTeamCard>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                } else if (item.tName) {
                  console.log("obj", index);
                  return (
                    <Draggable
                      draggableId={String(item.tName)}
                      index={index}
                      key={String(item.tName)}
                    >
                      {(provided) => {
                        let All;
                        {
                          const NewRR = item.pins.sort((a, b) => {
                            if (a.PriorityRank === "red") {
                              a.m = 4;
                            }
                            if (a.PriorityRank === "orange") {
                              a.m = 3;
                            }
                            if (a.PriorityRank === "yellow") {
                              a.m = 2;
                            }
                            if (a.PriorityRank === "green") {
                              a.m = 1;
                            }
                            if (b.PriorityRank === "red") {
                              b.m = 4;
                            }
                            if (b.PriorityRank === "orange") {
                              b.m = 3;
                            }
                            if (b.PriorityRank === "yellow") {
                              b.m = 2;
                            }
                            if (b.PriorityRank === "green") {
                              b.m = 1;
                            }
                            return a.m - b.m;
                          });
                          console.log("hard", NewRR);
                          All = NewRR;
                        }

                        return (
                          <div
                            key={String(item.tName)}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="  ml-4 flex-col flex"
                          >
                            <div className="w-32 truncate text-xs overflow-auto hover:text-clip">
                              {item.tName}
                            </div>
                            {All.map((pin) => {
                              return (
                                <div key={pin._id} className="mb-2">
                                  <StoryTeamCard
                                    key={pin._id}
                                    points={pin.storyPoints}
                                    criteria={pin.AcceptanceCriteria}
                                    name={pin.name}
                                    priority={pin.PriorityRank}
                                    color={pin.theme.color}
                                  ></StoryTeamCard>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                } else {
                  return (
                    <Draggable
                      draggableId={String(item._id)}
                      index={index}
                      key={String(item._id)}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={item._id}
                            className=" ml-4"
                          >
                            <div className="h-24 w-32 p-2 bg-red-100 opacity-0"></div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                }
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
