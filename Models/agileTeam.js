import mongoose from "mongoose";
import { AgileUser, agileUser } from "./agileUser";
import { AgilePin, agilePin } from "./agilePins";
import { agileRelease } from "./agileRelease";

const Schema = mongoose.Schema;

const agileTeam = new Schema({
  name: { type: String, required: [true, "Team Name is required"] },
  teamOwner: {
    type: String,
    required: [true, "Team owner is required"],
  },
  members: [agileUser],
  BackLog: [agilePin],
  sprint: { type: Number },
  Release: [agileRelease],
  chatHistory: [
    {
      sender: { type: String },
      time: { type: Date },
      message: { type: String },
    },
  ],
  teamData: {},
  teamSummary: { type: String },
});

mongoose.models = {};
const AgileTeam = mongoose.model("AgileTeam", agileTeam);

export default AgileTeam;
