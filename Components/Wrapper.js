import Header from "./header";
import SideBar from "./sideBar";
import { useRouter } from "next/router";

export default function Wrapper(props) {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <div className="h-screen">
      <Header></Header>
      <div className="flex h-full">
        <SideBar></SideBar>
        <div
          className={`w-screen ${router.pathname != "/" ? "ml-24" : ""}
        ${router.pathname === "/Teams" ? "ml-0" : ""}`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
