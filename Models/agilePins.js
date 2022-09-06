import mongoose from "mongoose";
const Schema = mongoose.Schema;

const agilePin = new Schema({
  name: { type: String, required: [true, "Agile Pin is Required"] },
  completed: { type: Boolean, default: false },
  AcceptanceCriteria: { type: String },
  AssignedTo: { type: String, default: "Anyone" },
  DateCreated: { type: Date, default: Date.now },
  DateCompleted: { type: Date },
  inProgress: { type: Boolean, default: false },
  storyPoints: { type: Number },
  theme: {
    color: { type: String, default: "indigo" },
    name: { type: String, default: "Notheme" },
  },
  Release: { type: String },
  Details: { type: String, default: "No details yet" },
  PriorityRank: { type: String, default: "green" },
});

mongoose.models = {};
const AgilePin = mongoose.model("AgilePin", agilePin);

export { AgilePin, agilePin };
