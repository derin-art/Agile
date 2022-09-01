import UserStory from "../../../Components/ProductOwner/UserStory";
import Release from "../../../Components/ProductOwner/Release";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useAuth } from "../../../Context/firebaseUserContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addIcon from "../../../public/addIcon";

export default function AccessTeam() {
  const {
    CreateRelease,
    currentTeam,
    userData,
    setCurrentOpenReleaseData,
    deleteRelease,
  } = useAuth();
  const [releaseName, setReleaseName] = useState("");
  const [currentRelease, setCurrentRelease] = useState(null);
  const [releaseStartDate, setReleaseStartDate] = useState("");
  const [releaseStopDate, setReleaseStopDate] = useState("");
  const [smallMenuOpen, setSmallMenuOpen] = useState(false);

  console.log("CHecking", currentTeam);
  return (
    <div className="mt-16 p-2 font-Josefin">
      {currentRelease ? (
        <p></p>
      ) : (
        <div>
          <div className="flex hidden md:block md:flex">
            {" "}
            <button
              className="border border-indigo-800 rounded-sm bg-indigo-100 text-indigo-700 flex text-sm p-1 items-center justify-center md:p-2 hover:text-indigo-900"
              onClick={() => {
                if (!releaseName) {
                  toast.error("Name input required", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: "text-sm",
                  });
                  return;
                }
                if (!releaseStartDate) {
                  toast.error("Release Start date required", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: "text-sm",
                  });
                  return;
                }
                if (!releaseStopDate) {
                  toast.error("Release End date required", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: "text-sm",
                  });
                  return;
                }
                console.log(currentTeam, userData);
                console.log("Yams");
                if (currentTeam && userData) {
                  const newCreatedRelease = CreateRelease(
                    userData.email,
                    currentTeam[0]._id,
                    releaseName,
                    releaseStartDate,
                    releaseStopDate
                  );
                  console.log(newCreatedRelease);
                }
              }}
            >
              {addIcon("fill-green-400 md:mr-2 hidden md:block")}
              <p> Create a new Release</p>
            </button>
            <div>
              {" "}
              <input
                onChange={(e) => {
                  setReleaseName(e.target.value);
                }}
                placeholder="Name"
                className="border ml-2 p-3 md:p-2 border-indigo-400 text-indigo-800 rounded-sm"
                value={releaseName}
              ></input>
            </div>
            <div className="flex ml-4 hidden md:block">
              <input
                type={"date"}
                onChange={(e) => {
                  setReleaseStartDate(e.target.value);
                }}
                value={releaseStartDate}
                className="border border-indigo-700 bg-indigo-100 placeholder:text-indigo-700 p-1 rounded-sm text-indigo-700"
              ></input>
              <input
                type={"date"}
                onChange={(e) => {
                  setReleaseStopDate(e.target.value);
                }}
                value={releaseStopDate}
                className="border border-indigo-700 bg-indigo-100 placeholder:text-indigo-700 p-1 ml-2 rounded-sm text-indigo-700"
              ></input>
            </div>
          </div>
          <div className="flex mt-4 hidden">
            <input
              type={"date"}
              onChange={(e) => {
                setReleaseStartDate(e.target.value);
              }}
              value={releaseStartDate}
              className="border border-indigo-700 bg-indigo-100 placeholder:text-indigo-700 p-1 rounded-sm text-indigo-700"
            ></input>
            <input
              type={"date"}
              onChange={(e) => {
                setReleaseStopDate(e.target.value);
              }}
              value={releaseStopDate}
              className="border border-indigo-700 bg-indigo-100 placeholder:text-indigo-700 p-1 ml-2 rounded-sm text-indigo-700"
            ></input>
          </div>

          <div className="mt-4">
            <div className="text-xl p-1 pb-0 tracking-wide font-bold border-b-4 border-indigo-400 w-fit mb-2">
              RELEASES
            </div>
            {currentTeam[0].Release.length > 0 ? (
              currentTeam[0].Release.map((item) => {
                if (item) {
                  return (
                    <div key={item._id} className="p-1">
                      <Release
                        deleteRelease={deleteRelease}
                        setCurrentOpenReleaseData={setCurrentOpenReleaseData}
                        name={item.name}
                        key={item._id}
                        currentTeam={currentTeam}
                        id={item._id}
                        dateStart={item.dateStart}
                        dateEnd={item.dateEnd}
                      ></Release>
                    </div>
                  );
                }
              })
            ) : (
              <p>No releases created yet</p>
            )}
          </div>
          <div
            className={`absolute ${
              smallMenuOpen ? "right-14" : "right-4"
            } bottom-4`}
          >
            <div
              className={`p-2 shadow-lg ${
                smallMenuOpen
                  ? "h-96 w-56 translate-y-4 bg-white rounded border  "
                  : "h-4 w-4 shadow-none rounded-full bg-transparent"
              } p-2 relative duration-300 static`}
            >
              <button
                onClick={() => setSmallMenuOpen(false)}
                className={`${
                  smallMenuOpen
                    ? "text-white border-red-800 border bg-red-400 p-1 rounded-sm"
                    : "text-transparent hidden"
                }`}
              >
                Close
              </button>

              <div
                className={`flex flex-col-reverse ${
                  smallMenuOpen ? "" : "hidden"
                }`}
              >
                <button
                  className="border border-indigo-800 rounded-sm shadow bg-green-400 text-white w-fit flex p-1 text-sm mt-2 items-center justify-center md:p-2 hover:text-indigo-900"
                  onClick={() => {
                    if (!releaseName) {
                      toast.error("Name input required", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        className: "text-sm",
                      });
                      return;
                    }
                    if (!releaseStartDate) {
                      toast.error("Release Start date required", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        className: "text-sm",
                      });
                      return;
                    }
                    if (!releaseStopDate) {
                      toast.error("Release End date required", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        className: "text-sm",
                      });
                      return;
                    }
                    console.log(currentTeam, userData);
                    console.log("Yams");
                    if (currentTeam && userData) {
                      const newCreatedRelease = CreateRelease(
                        userData.email,
                        currentTeam[0]._id,
                        releaseName,
                        releaseStartDate,
                        releaseStopDate
                      );
                      console.log(newCreatedRelease);
                    }
                  }}
                >
                  <p className="text-sm"> Create a new Release</p>
                </button>
                <div>
                  {" "}
                  <input
                    onChange={(e) => {
                      setReleaseName(e.target.value);
                    }}
                    placeholder="Name"
                    className={`border mt-2 text-sm ${
                      smallMenuOpen ? "" : "hidden"
                    } md:p-2 border-indigo-800 text-indigo-800 rounded-sm w-20 bg-indigo-100 placeholder:text-indigo-400 p-2`}
                    value={releaseName}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <input
                    type={"date"}
                    onChange={(e) => {
                      setReleaseStartDate(e.target.value);
                    }}
                    value={releaseStartDate}
                    className="border border-indigo-700 bg-indigo-100 placeholder:text-indigo-700 p-1 mb-2 mt-2 rounded-sm text-indigo-700"
                  ></input>
                  <input
                    type={"date"}
                    onChange={(e) => {
                      setReleaseStopDate(e.target.value);
                    }}
                    value={releaseStopDate}
                    className="border border-indigo-700 bg-indigo-100 placeholder:text-indigo-700 p-1 rounded-sm text-indigo-700"
                  ></input>
                </div>
                <p className="mt-2 mb-2 text-sm border-b-4 border-indigo-800">
                  Release Creating PopUp
                </p>
              </div>
            </div>
            <button
              className={`duration-500 md:hidden ${
                smallMenuOpen
                  ? "text-transparent"
                  : "text-green-400 bg-green-500 rounded-full p-1 border border-indigo-800"
              }`}
              onClick={() => setSmallMenuOpen(true)}
            >
              {addIcon(
                `${smallMenuOpen ? "fill-transparent" : "fill-green-200 "}`
              )}
            </button>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      )}
    </div>
  );
}
