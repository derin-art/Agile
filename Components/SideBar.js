import openFolderIcon from "../public/SideBarIcons/openFolderIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../Context/firebaseUserContext";

export default function SideBar() {
  const router = useRouter();
  const { currentTeam } = useAuth();

  console.log("routerName", router.pathname);

  console.log("Test", router.pathname === "/Teams");

  return (
    <div
      className={`flex flex-col bg-green-300 h-full font-Josefin text-indigo-600 ${
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
            {openFolderIcon("fill-green-300")}

            <p className="text-green-300">Backlog</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
