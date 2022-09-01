import { useAuth } from "../../../../Context/firebaseUserContext";
import ReleaseDraggable from "../../../../Components/ReleaseDraggable";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

  return (
    <div className="mt-14 ml-2">
      <div className="text-3xl font-Josefin border-b border-green-300 text-gray-300 mb-2">
        Story Map
      </div>
      {currentTeam[0].Release.length > 0 ? (
        currentTeam[0].Release.map((release) => {
          return (
            <ReleaseDraggable
              key={release._id}
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
  );
}
