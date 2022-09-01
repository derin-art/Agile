import deleteIcon from "../../public/deleteIcon";
import Link from "next/dist/client/link";

export default function Release({
  name,
  currentTeam,
  id,
  setCurrentOpenReleaseData,
  deleteRelease,
  dateStart,
  dateEnd,
}) {
  console.log("ReleaseId", id);

  return (
    <div className="relative flex md:w-1/2">
      <Link href={`/Teams/${currentTeam[0]._id}/userstory`}>
        <div
          onClick={() => {
            setCurrentOpenReleaseData(id);
          }}
          className="cursor-pointer border-l-4 border-green-300 text-white text-lg bg-indigo-800 rounded-sm border p-2 "
        >
          <p className="text-xs italic text-green-300 font-serif ">
            {dateStart} - {dateEnd}
          </p>
          {name}
        </div>
      </Link>
      {deleteIcon(
        "fill-indigo-800 absolute right-4 md:right-4 hover:fill-green-300 cursor-pointer mt-2",
        "24",
        "24",
        id,
        deleteRelease
      )}
    </div>
  );
}
