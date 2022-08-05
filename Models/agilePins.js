import mongoose from "mongoose";
const Schema = mongoose.Schema;

const agilePin = new Schema({
  name: { type: String, required: [true, "Agile Pin is Required"] },
  completed: { type: Boolean, default: false },
  AssignedTo: { type: String, default: "AnyOne" },
  DateAssigned: { type: Date, default: Date.now },
  DateCompleted: { type: Date },
  inProgress: { type: Boolean, default: false },
  storyPoints: { type: Number },
  theme: {
    color: { type: String, default: "green" },
    name: { type: String },
  },
  Release: { type: String },
  ColorCode: { type: String, default: "green" },
});

mongoose.models = {};
const AgilePin = mongoose.model("AgilePin", agilePin);

export { AgilePin, agilePin };
