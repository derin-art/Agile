import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import LogoHollow from "../public/logoHollow";
import Logo from "../public/logo";
import { useAuth } from "../Context/firebaseUserContext";
import signOutIcon from "../public/signOutIcon";
import downArrowFunction from "../public/downArrowIcon";
import { useState } from "react";
import openFolderIcon from "../public/SideBarIcons/openFolderIcon";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const { SignOut } = useAuth();
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div
        className={`flex p-2 text-white bg-indigo-800 shadow-md border-green-300 border-b items-center ${
          router.pathname === "/" ? "" : "fixed w-full"
        } z-50`}
      >
        <div className="flex">
          {Logo("fill-green-200", "30", "30")}
          <p className="text-green-300 mt-1 text-xl font-Josefin"> BUOYANT</p>
        </div>
        <div className="ml-2 hidden">
          <Link href="/">Home</Link>
          <Link href="/NewPage">Newpage</Link>
        </div>
        <button
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
          }}
        >
          {downArrowFunction(
            `fill-green-400 duration-500 ml-10 md:hidden ${
              router.pathname === "/" ? "md:hidden hidden" : ""
            } ${mobileMenuOpen ? "" : "rotate-180"}`
          )}
        </button>
        <button
          className={`absolute right-4 flex text-green-300 font-Josefin ${
            router.pathname === "/" ? "hidden" : "absolute"
          }`}
          onClick={() => {
            SignOut();
            router.push("/");
          }}
        >
          Logout
          {signOutIcon("fill-green-300 ml-2")}
        </button>
      </div>
      <div
        className={`bg-green-300 p-4 border-b z-40 shadow border-indigo-800  fixed w-screen duration-500 md:hidden ${
          mobileMenuOpen ? "-translate-y-4" : "translate-y-10"
        }
    
        
        `}
      >
        {openFolderIcon("fill-indigo-800")}
      </div>
    </div>
  );
}
