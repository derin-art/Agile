import Header from "./header";
import SideBar from "./sideBar";
import { useRouter } from "next/router";
import { useAuth } from "../Context/firebaseUserContext";
import React from "react";

export default function Wrapper(props) {
  const router = useRouter();
  console.log(router.pathname);
  const { authUser, loading } = useAuth();

  React.useEffect(() => {
    if (router.pathname != "/") {
      console.log(authUser, loading, "NewPage");
      if (!authUser) {
        router.push("/");
      }
    }
  }, [authUser, loading]);

  return (
    <div className="h-screen">
      <Header></Header>
      <div className="flex h-full">
        <SideBar></SideBar>
        <div
          className={`w-screen ${router.pathname != "/" ? "md:ml-24" : ""}
        ${router.pathname === "/Teams" ? "md:ml-0 ml-0" : ""}`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
