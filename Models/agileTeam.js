import mongoose from "mongoose";
import { AgileUser, agileUser } from "./agileUser";
import { AgilePin, agilePin } from "./agilePins";
import { agileRelease } from "./agileRelease";

const Schema = mongoose.Schema;

const agileTeam = new Schema({
  name: { type: String, required: [true, "Name of Agile Team is Required"] },
  teamOwner: {
    type: String,
    required: [true, "Name of team owner is Required"],
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
