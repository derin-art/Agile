export default function ThemeCard({ active, val, setFunction, item }) {
  return (
    <div className="border border-t-8 border-indigo-800 h-16 w-32 p-2 flex items-center justify-center">
      <input
        className={`text-center ${
          item.active ? "placeholder:text-gray-600" : "placeholder:text-white"
        } placeholder:duration-300 hover:placeholder:text-gray-300 rounded-lg outline-gray-100 w-full font-Josefin`}
        placeholder={`${item.active ? item.val : "Input Theme"}`}
        onChange={(e) => {
          setFunction((prev) => {
            const Tiles = prev.Tiles.map((ma) => {
              if (item.no === ma.no) {
                return {
                  active: ma.active,
                  no: ma.no,
                  val: e.target.value,
                };
              } else {
                return ma;
              }
            });
            const finalTiles = Tiles.map((tile) => {
              if (tile.val) {
                return {
                  active: true,
                  no: tile.no,
                  val: tile.val,
                };
              } else {
                return {
                  active: false,
                  no: tile.no,
                  val: tile.val,
                };
              }
            });
            return {
              ...prev,
              Tiles: finalTiles,
            };
          });
        }}
      ></input>
    </div>
  );
}
