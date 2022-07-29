import Header from "./header";

export default function Wrapper(props) {
  return (
    <div className="h-screen">
      <Header></Header>
      {props.children}
    </div>
  );
}
