import openFolderIcon from "../public/SideBarIcons/openFolderIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../Context/firebaseUserContext";
import teamHeadsIcon from "../public/teamHeadsicon";
import FolderAddIcon from "../public/folderAddIcon";

export default function SideBar() {
  const router = useRouter();
  const { currentTeam } = useAuth();

  console.log("routerName", router.pathname);

  console.log("Test", router.pathname === "/Teams");

  const isAccess =
    router.pathname === "/Teams/[accessteam]" ||
    router.pathname === "/Teams/[accessteam]/userstory";

  console.log("acccess", isAccess);
  return (
    <div
      className={`flex flex-col bg-green-300 h-full font-Josefin text-indigo-600 z-20 ${
        router.pathname === "/"
          ? "md:hidden hidden"
          : "md:block md:fixed hidden"
      }
      ${
        router.pathname === "/Teams"
          ? "hidden md:hidden"
          : "hidden md:block md:fixed"
      }
      

      `}
    >
      <div className="flex-col flex mt-12">
        <Link
          href={`${currentTeam ? `/Teams/${currentTeam[0]._id}` : "/Teams"}  `}
          className=""
        >
          <button
            className={`flex flex-col items-center justify-center p-4 ${
              router.pathname === "/Teams/[accessteam]"
                ? "bg-indigo-800 border-r-4 border-indigo-900"
                : ""
            }  ${
              router.pathname === "/Teams/[accessteam]/userstory"
                ? "bg-indigo-800 border-r-4 border-indigo-900"
                : ""
            }`}
          >
            {openFolderIcon(
              `${isAccess ? "fill-green-300" : "fill-indigo-800"} `
            )}

            <p
              className={`${isAccess ? "text-green-300" : "text-indigo-800"} `}
            >
              Backlog
            </p>
          </button>
        </Link>
        <Link
          href={`${
            currentTeam
              ? `/Teams/${currentTeam[0]._id}/[createDisplay]`
              : "/Teams"
          }  `}
          className=""
        >
          <button
            className={`flex flex-col items-center justify-center p-4 ${
              router.pathname === "/Teams/[accessteam]/[createDisplay]"
                ? "bg-indigo-800 border-r-4 border-indigo-900"
                : ""
            } `}
          >
            {FolderAddIcon(
              `${
                router.pathname === "/Teams/[accessteam]/[createDisplay]"
                  ? "fill-green-300"
                  : "fill-indigo-800"
              }`
            )}

            <p
              className={` w-14 ${
                router.pathname === "/Teams/[accessteam]/[createDisplay]"
                  ? "text-green-300"
                  : "text-indigo-800"
              }`}
            >
              Story Map
            </p>
          </button>
        </Link>

        <Link href="/Teams">
          <button className="flex flex-col items-center justify-center p-4">
            {teamHeadsIcon("fill-indigo-800")}
            <p className="w-16 text-xs text-indigo-800">
              Navigate to Team Menu
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
}
