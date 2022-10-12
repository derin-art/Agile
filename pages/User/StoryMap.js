import { useAuth } from "../../Context/firebaseUserContext";
import StoryTeamCard from "../../Components/StoryTeamCard";
import Mapped from "../../Components/MappedUser";

export default function StoryMap() {
  const { currentJoinedTeam } = useAuth();
  return (
    <div className="pt-14 pl-24">
      {Object.entries(currentJoinedTeam[0].Map).map((item) => {
        if (item[0] === "Tiles") {
          return (
            <div className="flex font-Josefin w-fit z-20 absolute top-16 z-40 bg-white">
              {item[1].map((tiles) => {
                return (
                  <div
                    key={tiles.no}
                    className={`border  truncate ${
                      tiles.active ? "border-indigo-800" : ""
                    }  border-t-8 w-32 px-1 ml-4 h-16 rounded-lg flex duration-300  justify-center items-center`}
                  >
                    {tiles.val}
                  </div>
                );
              })}
            </div>
          );
        }
      })}
      <div className="pt-24 h-5/6 overflow-y-auto w-fit">
        {Object.entries(currentJoinedTeam[0].Map).map((item) => {
          if (item[0] != "Tiles") {
            return (
              <Mapped
                Array={item[1]}
                id={item[0]}
                key={item[0]}
                name={item[0]}
              ></Mapped>
            );
          }
        })}
      </div>
    </div>
  );
}

/*           if (!arrItem) return;
                if (arrItem.name) {
                  return (
                    <div className="">
                      <div className="w-32 truncate text-xs overflow-auto hover:text-clip">
                        No theme
                      </div>
                      <StoryTeamCard
                        name={arrItem.name}
                        criteria={arrItem.AcceptanceCriteria}
                        points={arrItem.storyPoints}
                        priority={arrItem.PriorityRank}
                        key={arrItem._id}
                        color={arrItem.theme.color}
                      ></StoryTeamCard>
                    </div>
                  );
                } else if (arrItem.tName) {
                  <div className="w-32 truncate text-xs overflow-auto hover:text-clip">
                    {arrItem.tName}
                  </div>;
                  return arrItem.pins.map((story) => {
                    return (
                      <div key={story._id} className="mb-2">
                        <StoryTeamCard
                          key={story._id}
                          points={story.storyPoints}
                          criteria={story.AcceptanceCriteria}
                          name={story.name}
                          priority={story.PriorityRank}
                          color={story.theme.color}
                        ></StoryTeamCard>
                      </div>
                    );
                  });
                } else {
                  return (
                    <div
                      className="h-24 w-32 p-2 bg-red-100 opacity-0"
                      key={arrItem._id}
                    ></div>
                  );
                } */
