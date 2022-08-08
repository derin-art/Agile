import deleteIcon from "../../public/deleteIcon";
export default function Release({ name }) {
  return (
    <div className="border p-2 relative flex text-sm md:w-1/2 border-l-4 border-indigo-400 text-gray-700 bg-green-100 rounded-sm">
      {name}
      {deleteIcon("fill-green-400 absolute right-4 md:right-4")}
    </div>
  );
}
