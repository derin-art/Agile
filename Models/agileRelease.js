import mongoose from "mongoose";
import { agilePin } from "./agilePins";
const Schema = mongoose.Schema;

const agileRelease = new Schema({
  owner: { type: String },
  teamId: { type: String },
  name: { type: String, required: [true, "Name of release is required"] },
  dateRange: { type: Date },
  agilePins: [agilePin],
});

mongoose.models = {};
const AgileRelease = mongoose.model("AgileRelease", agileRelease);

export { agileRelease, AgileRelease };
