import stringify from "json-stringify";
import parseJson from "parse-json";
import Link from "next/dist/client/link";
import deleteIcon from "../../public/deleteIcon";
import Logo from "../../public/logo";

export default function TeamLinkRender({
  stateTeamData,
  setCurrentTeamAvailable,
  setMessagesBeforeUpdate,
  deleteTeam,
  userTeamData,
}) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-72 overflow-y-auto">
        <div className={`text-3xl w-full h-full`}>
          {stateTeamData ? (
            stateTeamData.length > 0 ? (
              <div className="w-full flex-col flex">
                {userTeamData.map((item) => (
                  <div
                    className="flex text-sm mt-4 border-l-4 items-center w-full relative z-10  border-green-300 pl-1"
                    key={item._id}
                  >
                    <Link href={`/Teams/${item._id}`}>
                      <button
                        className="text-white mr-4  md:text-lg lg:text-2xl"
                        onClick={() => {
                          setCurrentTeamAvailable(item._id);
                          setMessagesBeforeUpdate(item);
                          window.localStorage.setItem(
                            "chatMessages",
                            stringify(item.chatHistory)
                          );
                        }}
                      >
                        {item.name}
                      </button>
                    </Link>

                    <button
                      id={item._id}
                      className="absolute right-0 -mt-4 z-10"
                      onClick={(e) => {
                        toast.info("delete disabled for demo", {
                          className: "text-sm",
                        });
                        return;
                        deleteTeam(e.target.id);
                      }}
                    >
                      {deleteIcon(
                        "fill-red-600 p-2 bg-white rounded-full",
                        "40",
                        "40",
                        item._id,
                        deleteTeam
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-2xl">No Teams Created</p>
            )
          ) : (
            Logo("animate-spin fill-white", "100", "100")
          )}
        </div>
      </div>
    </div>
  );
}
