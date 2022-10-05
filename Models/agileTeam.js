import mongoose from "mongoose";
import { AgileUser, agileUser } from "./agileUser";
import { AgilePin, agilePin } from "./agilePins";
import { agileRelease } from "./agileRelease";

const Schema = mongoose.Schema;

const agileTeam = new Schema(
  {
    name: { type: String, required: [true, "Team Name is required"] },
    teamOwner: {
      type: String,
      required: [true, "Team owner is required"],
    },
    members: [agileUser],
    BackLog: [agilePin],
    sprint: { type: Number },
    Release: [agileRelease],
    chatHistory: {
      Chats: [
        {
          sender: { type: String },
          time: { type: Date },
          message: { type: String },
        },
      ],
    },
    teamData: {
      sprints: { type: Schema.Types.Mixed, default: {} },
    },
    Map: { type: Schema.Types.Mixed, default: false },

    teamSummary: { type: String },
  },
  { minimize: false }
);

mongoose.models = {};
const AgileTeam = mongoose.model("AgileTeam", agileTeam);

export default AgileTeam;
