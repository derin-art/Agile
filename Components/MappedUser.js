import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import StoryTeamCard from "./StoryTeamCard";
import { useAuth } from "../Context/firebaseUserContext";

export default function Mapped({ Array, id, name }) {
  console.log("k", Array);
  const { currentTeam, currentJoinedTeam } = useAuth();

  const releaseUsed = currentJoinedTeam[0].Release.filter(
    (release) => release._id === id
  );

  return (
    <div className="h-fit w-fit mb-4  text-lg font-Josefin bg-gray-100 pt-2 pb-2 pr-2">
      <div className="w-full border-b pl-4 text-2xl text-gray-500  border-green-400">
        Release {releaseUsed[0].name}
      </div>
      <div key={id} className="flex">
        {
          <div className="flex border border-white h-fit">
            {Array.map((item, index) => {
              if (!item) return;
              if (item.name) {
                console.log("str", index);
                return (
                  <div key={item._id} className=" ml-4">
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
              } else if (item.tName) {
                console.log("obj", index);
                return (
                  <div
                    key={String(item.tName)}
                    className="  ml-4 flex-col flex"
                  >
                    <div className="w-32 truncate text-xs overflow-auto hover:text-clip">
                      {item.tName}
                    </div>
                    {item.pins.map((pin) => {
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
              } else {
                return (
                  <div key={item._id} className=" ml-4">
                    <div className="h-24 w-32 p-2 bg-red-100 opacity-0"></div>
                  </div>
                );
              }
            })}
          </div>
        }
      </div>
    </div>
  );
}
