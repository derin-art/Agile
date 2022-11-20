export default function CreateTeamMenu({
  setName,
  setTeamSummary,
  createNewTeam,
}) {
  return (
    <div className="bg-white p-3 rounded">
      <div className="flex ">
        <div className="mr-2 text-gray-400">
          <div>Team Name</div>
          <div className="mt-4">Team Description</div>
        </div>
        <div className="flex-col flex">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="px-4 p-1 mb-2 border rounded xl:w-64"
            placeholder="Team Name"
          ></input>
          <textarea
            onChange={(e) => {
              setTeamSummary(e.target.value);
            }}
            className="px-4 p-1 mb-2 border rounded xl:w-64"
            placeholder="Team Description"
          ></textarea>
        </div>
      </div>
      <div className="w-full items-center justify-center mt-4 flex">
        <button
          onClick={() => {
            createNewTeam();
          }}
          className="px-4 p-2 bg-indigo-800 duration-300 text-white rounded w-fit hover:bg-indigo-900"
        >
          Create Team
        </button>
      </div>
    </div>
  );
}
