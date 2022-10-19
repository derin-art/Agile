import { useAuth } from "../../../../Context/firebaseUserContext";
import ReleaseDraggable from "../../../../Components/ReleaseDraggable";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function CreateDisplay() {
  const {
    currentTeam,
    authUser,
    loading,
    CreateUserWithEmailAndPassword,
    SignInWithEmailAndPassword,
  } = useAuth();
  console.log("currenetTemsa", currentTeam);
  const router = useRouter();

  useEffect(() => {
    console.log(authUser, loading, "NewPage");
    if (!authUser) {
      router.push("/");
    }
  }, [authUser, loading]);

  const launchTutorial = () => {
    toast.info(
      <div>
        Sprints are the ways a product owner direct his/her team to complete a
        release. They are short time frames, usually between 1 week to 4 weeks
        where Stories are undertaken by the team and performance evaluated at
        the end of the sprint. If you were logged as a team member as part of
        this team you would be able to pick up stories, updating the status of
        the story for the your colleagues and product owner to see. Click on the
        info icon in the stories present in the sprint to access the their
        current status and which team members are working on them.
      </div>,
      {
        autoClose: false,
        className: "text-sm",
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  useEffect(() => {
    launchTutorial();
  }, []);

  return (
    <div className="mt-14 ml-6">
      <div className="text-3xl font-Josefin border-b border-green-300 text-gray-300 mb-2">
        Story Map
      </div>
      <div className="md:block hidden">
        <ToastContainer></ToastContainer>
        {currentTeam[0].Release.length > 0 ? (
          currentTeam[0].Release.map((release) => {
            return (
              <ReleaseDraggable
                key={release._id}
                currentTeam={currentTeam}
                agilePins={release.agilePins}
                dateStart={release.dateStart}
                dateEnd={release.dateEnd}
                name={release.name}
                id={release._id}
              ></ReleaseDraggable>
            );
          })
        ) : (
          <p className="text-lg font-Josefin">
            No Releases created <span className="text-green-400 ">yet</span>{" "}
          </p>
        )}
      </div>
    </div>
  );
}
