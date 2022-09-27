import { useRouter } from "next/dist/client/router";
import FolderAddIcon from "../public/folderAddIcon";

export default function UserSideBar() {
  const router = useRouter();

  return (
    <div
      className={`h-full flex flex-col w-24 bg-indigo-900 ${
        router.pathname.includes("/Teams") ? "hidden md:hidden" : "fixed"
      } ${router.pathname === "/User" ? "hidden md:hidden" : ""} ${
        router.pathname === "/" ? "hidden" : ""
      }`}
    >
      <button className="mt-[51px] p-2 flex flex-col items-center justify-center bg-indigo-800">
        {FolderAddIcon("fill-indigo-600")}
        <p className="font-Josefin text-indigo-500">Team Story Map</p>
      </button>
    </div>
  );
}
