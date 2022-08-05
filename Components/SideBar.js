import react from "react";
import openFolderIcon from "../public/SideBarIcons/openFolderIcon";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col bg-green-300 h-full p-2 font-Josefin text-indigo-600 w-24 fixed ${
        router.pathname === "/" ? "hidden" : "block fixed"
      }
      ${router.pathname === "/Teams" ? "hidden" : "block fixed"}
      `}
    >
      <div className="flex-col flex mt-12">
        <button className="flex flex-col items-center justify-center">
          <Link href="/NewPage" className="">
            {openFolderIcon("fill-indigo-600")}
          </Link>
          <p className="">Backlog</p>
        </button>
      </div>
    </div>
  );
}
