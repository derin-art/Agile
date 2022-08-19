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
          className="cursor-pointer border-l-4 border-indigo-400 text-gray-900 bg-green-100 rounded-sm border p-2 "
        >
          <p className="text-xs font-italic text-gray-500">
            {dateStart} - {dateEnd}
          </p>
          {name}
        </div>
      </Link>
      {deleteIcon(
        "fill-green-400 absolute right-4 md:right-4 hover:fill-indigo-800 cursor-pointer mt-2",
        "24",
        "24",
        id,
        deleteRelease
      )}
    </div>
  );
}
