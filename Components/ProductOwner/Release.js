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
    <div className="relative flex md:w-1/2 border-b">
      <Link href={`/Teams/${currentTeam[0]._id}/userstory`}>
        <div
          onClick={() => {
            setCurrentOpenReleaseData(id);
          }}
          className="cursor-pointer text-gray-900 text-sm rounded-sm  p-2 "
        >
          <p className="text-xs text-gray-600 ">
            {dateStart} - {dateEnd}
          </p>
          {name}
        </div>
      </Link>
      {deleteIcon(
        "fill-red-500 absolute right-4 md:right-4 hover:fill-red-700 cursor-pointer duration-300 mt-5",
        "24",
        "24",
        id,
        deleteRelease
      )}
    </div>
  );
}
