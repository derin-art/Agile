import { useRouter } from "next/dist/client/router";
import LogoHollow from "../public/logoHollow";
import Logo from "../public/logo";
import { useAuth } from "../Context/firebaseUserContext";
import signOutIcon from "../public/signOutIcon";
import downArrowFunction from "../public/downArrowIcon";
import { useEffect, useState } from "react";
import openFolderIcon from "../public/SideBarIcons/openFolderIcon";
import parseJson from "parse-json";
import Link from "next/link";
import FolderAddIcon from "../public/folderAddIcon";
import TeamDataIcon from "../public/SideBarIcons/teamDataIcon";
import MapIcon from "../public/SideBarIcons/mapIcon";
import CommunicateIcon from "../public/SideBarIcons/communicateIcon";

import stringify from "json-stringify";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const { SignOut, currentTeam, userData, currentJoinedTeam } = useAuth();
  let tutorialBool;

  useEffect(() => {
    if (typeof window !== "undefined") {
      tutorialBool = parseJson(window.localStorage.getItem("enableTutorial"));
    }
  }, []);

  const teamLinks = [
    {
      name: "Backlog",
      link: `/Teams/accessteam`,
      icon: openFolderIcon(),
      pathname: "/Teams/[accessteam]",
    },
    {
      name: "Sprint Planning",
      link: `/Teams/accessteam/createDisplay`,
      icon: FolderAddIcon(),
      pathname: "/Teams/[accessteam]/[createDisplay]",
    },
    {
      name: "Team and Data",
      link: `/Teams/accessteam/createDisplay/communication`,
      icon: TeamDataIcon(),
      pathname: "/Teams/[accessteam]/[createDisplay]/[communication]",
    },
    {
      name: "StoryMap",
      link: `/Teams/accessteam/createDisplay/communication/Story`,
      icon: MapIcon(),
      pathname: "/Teams/[accessteam]/[createDisplay]/[communication]/Story",
    },
    {
      name: "Team Chat",
      link: `/Teams/accessteam/createDisplay/communication/Chat`,
      icon: CommunicateIcon(),
      pathname: "/Teams/[accessteam]/[createDisplay]/[communication]/Chat",
    },
  ];

  const [TeamLinks, setTeamLinks] = useState(teamLinks);

  const [tutorialEnabled, setTutorialEnabled] = useState(tutorialBool);
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
          className="hidden"
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
          className={`absolute right-32 hidden md:block font-Josefin ${
            router.pathname === "/" ? "hidden md:hidden" : ""
          }`}
          onClick={() => {
            setTutorialEnabled((prev) => !prev);
            if (typeof window !== "undefined") {
              const formerLocalStorageTutorialBool = parseJson(
                window.localStorage.getItem("enableTutorial")
              );
              window.localStorage.setItem(
                "enableTutorial",
                !formerLocalStorageTutorialBool
              );
            }
          }}
        >
          {tutorialEnabled
            ? "Disable Tutorial Popups"
            : "Enable Tutorial Popups"}
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
        className={`bg-green-300 border-b z-40 font-Josefin shadow border-indigo-800  fixed w-screen duration-500 md:hidden ${
          mobileMenuOpen ? "-translate-y-10" : "translate-y-10"
        }
    
        
        `}
      >
        {
          <div className="flex">
            {TeamLinks &&
              TeamLinks.map((link) => {
                return (
                  <Link href={link.link} key={link.link} className="">
                    <button
                      className={`${
                        link.pathname === router.pathname ? "border-b" : ""
                      } text-xs pt-2 ${
                        router.pathname.includes("/Teams/[accessteam]")
                          ? "hidden"
                          : ""
                      } mr-1 w-20 font-Josefin flex flex-col items-center justify-center`}
                    >
                      {link.icon}
                      {link.name}
                    </button>
                  </Link>
                );
              })}
            {/*  <Link
              href={`${
                currentTeam ? `/Teams/${currentTeam[0]._id}` : "/Teams"
              }  `}
            >
              <button className="">
                {openFolderIcon("fill-indigo-800")}
                Backlog
              </button>
            </Link> */}
          </div>
        }
      </div>
    </div>
  );
}

/*     href={`${currentTeam ? `/Teams/${currentTeam[0]._id}` : "/Teams"}  `} */
