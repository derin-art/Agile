import deleteIcon from "../../public/deleteIcon";
import Link from "next/dist/client/link";

export default function Release({
  name,
  currentTeam,
  id,
  setCurrentOpenReleaseData,
}) {
  console.log("CUrrentteam", currentTeam);

  return (
    <Link href={`/Teams/${currentTeam[0]._id}/userstory`}>
      <div
        onClick={() => {
          setCurrentOpenReleaseData(id);
        }}
        className="border p-2 relative flex md:w-1/2 cursor-pointer border-l-4 border-indigo-400 text-gray-700 bg-green-100 rounded-sm"
      >
        {name}
        {deleteIcon("fill-green-400 absolute right-4 md:right-4")}
      </div>
    </Link>
  );
}
