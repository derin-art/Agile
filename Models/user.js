import mongoose from "mongoose";
var Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
  },
  Age: {
    type: Number,
  },
});

console.log(mongoose.modelNames().find((item) => item === "NewModel"));
mongoose.models = {};
const UserModel = mongoose.model("NewModel", user);

export default UserModel;
