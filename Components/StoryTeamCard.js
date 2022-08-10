import alertIcon from "../public/alertIcon";

export default function StoryTeamCard({ name }) {
  return (
    <div className="bg-gradient-to-r relative from-red-400 to-red-500 text-white w-32 h-24 font-Josefin p-2 rounded-xl ">
      {name}
      {alertIcon(
        "fill-yellow-400 absolute top-0 border-red-400 rounded-tr-lg border p-1 bg-white right-0",
        "30",
        "30"
      )}
      <p className="truncate text-xs hover:text-clip">
        smdmsmdsmd sdnsndsndndwf ndnfndfndf sdnsndnsnds sndnsdnsndnsdsd
        sdnsndnsqdnqdnqsndqdd dsdsjdsqkd
      </p>
    </div>
  );
}
