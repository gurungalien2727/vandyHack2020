const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfo = new Schema({
  username: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
});

const LoginInfo = mongoose.model("loginInfo", userInfo);
module.exports = LoginInfo;
