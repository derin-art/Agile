export default function EpicMenu({
  themeColor,
  Logo,
  setDataSaved,
  dataSaved,
  themeName,
  themes,
  SetTheme,
  setThemeName,
  toast,
  setCurrentPinsOpen,
  saveStories,
  colorCOdes,
  currentPinsOpen,
  motion,
  Themes,
}) {
  return (
    <div>
      <div className="flex-col font-Josefin relative input-menu">
        <div className="mb-2">
          <button
            style={{ transitionDuration: "3s" }}
            onClick={() => {
              if (!themeColor || !themeName) {
                toast.error("Epic color and Name required for new Epic", {
                  position: toast.POSITION.BOTTOM_CENTER,
                  className: "text-sm",
                });
                return;
              }
              if (themes.some((item) => item.name === themeName)) {
                toast.error("Epic name is already in Use", {
                  position: toast.POSITION.BOTTOM_CENTER,
                  className: "text-sm",
                });
                return;
              }
              SetTheme((prev) => {
                return [...prev, { name: themeName, color: themeColor }];
              });
              setCurrentPinsOpen((prev) => {
                return { ...prev, [themeName]: [] };
              });
            }}
            className="btn-primary "
          >
            Create a New Epic{" "}
          </button>
        </div>
        <div className=" ">
          <p className="-mb-2 text-indigo-800">Input Epic Name</p>
          <input
            className={`border p-1 mb-2 mt-2 rounded border-l-4 border-${themeColor}`}
            placeholder="Epic Name"
            onChange={(e) => {
              setThemeName(e.target.value);
            }}
          ></input>
          <div className="flex flex-col mb-2 text-gray-500">
            <p className="-mb-2 text-indigo-800">Select Epic Color/Accent</p>
          </div>
          <motion.div
            initial={{ height: "45px" }}
            whileHover={{ height: "160px" }}
            transition={{ duration: 0.5 }}
            className="w-44 scrollbar-thin border p-3 rounded-sm "
          >
            {colorCOdes()}
          </motion.div>
        </div>

        <div className="absolute -bottom-2 flex items-center hidden">
          <button
            className="bg-indigo-800 p-2 px-3 text-white rounded shadow hover:text-indigo-800 hover:border border-indigo-800 hover:bg-white"
            onClick={async () => {
              setDataSaved((prev) => ({ ...prev, loading: true }));

              const editedPinsWithEpics = Object.entries(currentPinsOpen).map(
                (item, index) => {
                  if (item) {
                    return item[1].map((pins) => {
                      if (pins) {
                        const itemColor = Themes.filter((theme) => {
                          if (theme) {
                            return theme.name === item[0];
                          }
                        });

                        const newTheme = {
                          name: item[0],
                          color: itemColor[0].color,
                        };
                        return { ...pins, theme: newTheme };
                      }
                    });
                  } else {
                    return;
                  }
                }
              );

              const response = await saveStories(editedPinsWithEpics.flat());

              setDataSaved((prev) => ({
                loading: false,
                status: response.status,
              }));
            }}
          >
            Save Current State
          </button>
          {dataSaved.loading && Logo("ml-2 fill-green-400 animate-spin")}
        </div>
      </div>
    </div>
  );
}
