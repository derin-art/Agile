import Mapped from "./MappedUser";

export default function StoryMapRenderUser({ Tiles, testArray }) {
  return (
    <div className="p-4 h-5/6 ml-10 border p-2 overflow-x-auto overflow-y-hidden max-w-[1300px]">
      <div className="flex w-fit pl-4">
        {Tiles.map((item, index) => {
          return (
            <div className="mr-4 border border-t-8 font-Josefin border-indigo-800 h-16 w-32 p-2 flex items-center justify-center">
              <div className="">{item.active ? item.val : ""}</div>
            </div>
          );
        })}
      </div>
      <div className="h-5/6 overflow-auto mt-8 -ml-2">
        {Object.entries(testArray).map((item) => {
          if (item[0] !== "Tiles") {
            return (
              <Mapped
                Array={item[1]}
                id={item[0]}
                name={item[0]}
                key={item[0]}
              ></Mapped>
            );
          }
        })}
      </div>
    </div>
  );
}
