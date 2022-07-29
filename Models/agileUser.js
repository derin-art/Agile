import mongoose from "mongoose";

const Schema = mongoose.Schema;

const agileUser = new Schema({
  name: {
    type: String,
    required: [true, "Name of new User must be provided"],
  },
  email: {
    type: String,
    required: [true, "Email of new User is required"],
  },
  password: {
    type: String,
    required: [true, "Password of New User is required"],
  },
  role: {
    type: String,
    default: "TeamMember",
  },
  currentTeam: {
    type: String,
  },
  color: {
    type: String,
  },
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
  gitHub: {
    type: String,
  },
});

mongoose.models = {};
const AgileUser = mongoose.model("AgileUser", agileUser);
export { AgileUser, agileUser };
