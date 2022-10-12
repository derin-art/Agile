import { useRouter } from "next/dist/client/router";
import FolderAddIcon from "../public/folderAddIcon";
import teamHeadsIcon from "../public/teamHeadsicon";
import MapIcon from "../public/SideBarIcons/mapIcon";
import CommunicateIcon from "../public/SideBarIcons/communicateIcon";
import Link from "next/link";

export default function UserSideBar() {
  const router = useRouter();

  return (
    <div
      className={`h-full flex flex-col w-24 bg-indigo-900 z-40 ${
        router.pathname.includes("/Teams") ? "hidden md:hidden" : "fixed"
      } ${router.pathname === "/User" ? "hidden md:hidden" : ""} ${
        router.pathname === "/" ? "hidden" : ""
      }`}
    >
      <Link href="/User/UserTeam" className="">
        <button
          className={`flex mt-[51px] font-Josefin duration-300 flex-col items-center justify-center p-4 ${
            router.pathname === "/User/UserTeam"
              ? "bg-indigo-800 border-r-4 border-indigo-700"
              : ""
          } `}
        >
          {FolderAddIcon(
            `duration-300 ${
              router.pathname === "/User/UserTeam"
                ? "fill-green-300"
                : "fill-indigo-600"
            }`
          )}

          <p
            className={`duration-300 w-14 ${
              router.pathname === "/User/UserTeam"
                ? "text-green-300"
                : "text-indigo-500"
            }`}
          >
            <p className="text-center">Sprints</p>
          </p>
        </button>
      </Link>

      <Link href="/User/Communication" className="">
        <button
          className={`flex duration-300 font-Josefin flex-col items-center justify-center p-4 ${
            router.pathname === "/User/Communication"
              ? "bg-indigo-800 border-r-4 border-indigo-700"
              : ""
          } `}
        >
          {CommunicateIcon(
            `duration-300 ${
              router.pathname === "/User/Communication"
                ? "fill-green-300"
                : "fill-indigo-600"
            }`
          )}

          <p
            className={`duration-300 w-14 ${
              router.pathname === "/User/Communication"
                ? "text-green-300"
                : "text-indigo-500"
            }`}
          >
            <p className="text-center">Team Contact</p>
          </p>
        </button>
      </Link>

      <Link href="/User/StoryMap" className="">
        <button
          className={`flex duration-300 font-Josefin flex-col items-center justify-center p-4 ${
            router.pathname === "/User/StoryMap"
              ? "bg-indigo-800 border-r-4 border-indigo-700"
              : ""
          } `}
        >
          {MapIcon(
            `duration-300 ${
              router.pathname === "/User/StoryMap"
                ? "fill-green-300"
                : "fill-indigo-600"
            }`
          )}

          <p
            className={`duration-300 w-14 ${
              router.pathname === "/User/StoryMap"
                ? "text-green-300"
                : "text-indigo-500"
            }`}
          >
            <p className="text-center">Team Story Map</p>
          </p>
        </button>
      </Link>

      <Link href="/User">
        <button className="flex font-Josefin flex-col items-center justify-center p-4">
          {teamHeadsIcon("fill-indigo-600")}
          <p className="w-16 text-xs text-indigo-500">Navigate to User Menu</p>
        </button>
      </Link>
    </div>
  );
}
