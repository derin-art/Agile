import mongoose from "mongoose";
import { AgileUser, agileUser } from "./agileUser";
import { AgilePin, agilePin } from "./agilePins";

const Schema = mongoose.Schema;

const agileTeam = new Schema({
  name: { type: String, required: [true, "Name of Agile Team is Required"] },
  members: [agileUser],
  BackLog: [agilePin],
});

mongoose.models = {};
const AgileTeam = mongoose.model("AgileTeam", agileTeam);

export default AgileTeam;
