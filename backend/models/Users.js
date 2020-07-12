const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  zipcode: { type: Number, required: true, unique: true, dropDups: true },
  lat: { type: String, required: true },
  lng: { type: Number, required: true },
  count: { type: Number, required: true },
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;
