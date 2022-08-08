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
  const { CreateRelease, currentTeam, userData } = useAuth();
  const [releaseName, setReleaseName] = useState("");
  const [currentRelease, setCurrentRelease] = useState(null);
  const [releaseStartDate, setReleaseStartDate] = useState("");
  const [releaseStopDate, setReleaseStopDate] = useState("");

  console.log("CHecking", currentTeam);
  return (
    <div className="mt-16 p-2 font-Josefin">
      {currentRelease ? (
        <p></p>
      ) : (
        <div>
          <div className="flex">
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
          <div className="flex mt-4 md:hidden block">
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
            <div className="text-xl p-1 pb-0 tracking-wide border-b-4 border-indigo-400 w-fit mb-2">
              RELEASES
            </div>
            {currentTeam[0].Release.length > 0 ? (
              currentTeam[0].Release.map((item) => (
                <div key={item._id} className="p-1">
                  <Release name={item.name} key={item._id}></Release>
                </div>
              ))
            ) : (
              <p>No releases created yet</p>
            )}
          </div>
          <ToastContainer></ToastContainer>

          <div className="border hidden">
            <UserStory></UserStory>
            <DragDropContext>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Draggable draggableId="2" index={1}>
                      {(provided) => (
                        <li
                          index={1}
                          className="bg-green-300 m-2 w-fit"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Heyyd
                        </li>
                      )}
                    </Draggable>
                    <Draggable draggableId="1" index={2}>
                      {(provided) => (
                        <li
                          index={2}
                          className="bg-green-300 m-2 w-fit"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Heyy
                        </li>
                      )}
                    </Draggable>
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      )}
    </div>
  );
}
