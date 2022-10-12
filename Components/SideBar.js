import openFolderIcon from "../public/SideBarIcons/openFolderIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../Context/firebaseUserContext";
import teamHeadsIcon from "../public/teamHeadsicon";
import FolderAddIcon from "../public/folderAddIcon";
import { useEffect } from "react";
import CommunicateIcon from "../public/SideBarIcons/communicateIcon";
import MapIcon from "../public/SideBarIcons/mapIcon";

export default function SideBar() {
  const router = useRouter();
  const { currentTeam, setCurrentMessages } = useAuth();

  const isAccess =
    router.pathname === "/Teams/[accessteam]" ||
    router.pathname === "/Teams/[accessteam]/userstory";

  return (
    <div
      className={`flex flex-col bg-indigo-900 shadow h-full font-Josefin text-indigo-600 z-20 ${
        router.pathname === "/"
          ? "md:hidden hidden"
          : "md:block md:fixed hidden"
      }
      ${
        router.pathname === "/Teams"
          ? "hidden md:hidden"
          : "hidden md:block md:fixed"
      }

      ${router.pathname.includes("/User") ? "hidden md:hidden" : ""}
      

      `}
    >
      <div className="flex-col flex mt-12">
        <Link
          href={`${currentTeam ? `/Teams/${currentTeam[0]._id}` : "/Teams"}  `}
          className=""
        >
          <button
            className={`flex flex-col items-center justify-center p-4 duration-300 ${
              router.pathname === "/Teams/[accessteam]"
                ? "bg-indigo-800 border-r-4 border-indigo-700"
                : ""
            }  ${
              router.pathname === "/Teams/[accessteam]/userstory"
                ? "bg-indigo-800 border-r-4 border-indigo-900"
                : ""
            }`}
          >
            {openFolderIcon(
              `${isAccess ? "fill-green-300" : "fill-indigo-600"} duration-300 `
            )}

            <p
              className={`${
                isAccess ? "text-green-300" : "text-indigo-500"
              } duration-300`}
            >
              Backlog
            </p>
          </button>
        </Link>
        <Link
          href={`${
            currentTeam
              ? `/Teams/${currentTeam[0]._id}/createDisplay`
              : "/Teams"
          }  `}
          className=""
        >
          <button
            className={`flex flex-col items-center justify-center p-4 duration-300 ${
              router.pathname === "/Teams/[accessteam]/[createDisplay]"
                ? "bg-indigo-800 border-r-4 border-indigo-700"
                : ""
            } `}
          >
            {FolderAddIcon(
              `${
                router.pathname === "/Teams/[accessteam]/[createDisplay]"
                  ? "fill-green-300"
                  : "fill-indigo-600"
              } duration-300`
            )}

            <p
              className={`duration-300 w-14 ${
                router.pathname === "/Teams/[accessteam]/[createDisplay]"
                  ? "text-green-300"
                  : "text-indigo-500"
              }`}
            >
              Sprint Planning
            </p>
          </button>
        </Link>

        <Link
          href={`${
            currentTeam
              ? `/Teams/${currentTeam[0]._id}/createDisplay/communication`
              : "/Teams"
          }  `}
          className=""
        >
          <button
            onClick={() => {
              setCurrentMessages();
            }}
            className={`flex duration-300 flex-col items-center justify-center p-4 ${
              router.pathname ===
              "/Teams/[accessteam]/[createDisplay]/[communication]"
                ? "bg-indigo-800 border-r-4 border-indigo-700"
                : ""
            } `}
          >
            {CommunicateIcon(
              `duration-300 ${
                router.pathname ===
                "/Teams/[accessteam]/[createDisplay]/[communication]"
                  ? "fill-green-300"
                  : "fill-indigo-600"
              }`
            )}

            <p
              className={`duration-300 w-14 ${
                router.pathname ===
                "/Teams/[accessteam]/[createDisplay]/[communication]"
                  ? "text-green-300"
                  : "text-indigo-500"
              }`}
            >
              <p className="text-center">Team and contact</p>
            </p>
          </button>
        </Link>

        <Link
          href={`${
            currentTeam
              ? `/Teams/${currentTeam[0]._id}/createDisplay/communication/Story`
              : "Teams"
          }`}
        >
          <button
            className={`flex duration-300 flex-col items-center justify-center p-4 ${
              router.pathname ===
              "/Teams/[accessteam]/[createDisplay]/[communication]/Story"
                ? "bg-indigo-800 border-r-4 border-indigo-700"
                : ""
            } `}
          >
            {MapIcon(
              `duration-300 ${
                router.pathname ===
                "/Teams/[accessteam]/[createDisplay]/[communication]/Story"
                  ? "fill-green-300"
                  : "fill-indigo-600"
              }`,
              "24",
              "24"
            )}

            <p
              className={`duration-300 w-14 ${
                router.pathname ===
                "/Teams/[accessteam]/[createDisplay]/[communication]/Story"
                  ? "text-green-300"
                  : "text-indigo-500"
              }`}
            >
              <p className="text-center"> Map</p>
            </p>
          </button>
        </Link>

        <Link href="/Teams">
          <button className="flex flex-col items-center justify-center p-4">
            {teamHeadsIcon("fill-indigo-600")}
            <p className="w-16 text-xs text-indigo-500">
              Navigate to Team Menu
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
}
