const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  fullname: { type: String, required: true },
  zipcode: { type: Number, required: true },
  temperature: { type: String, required: true },
  fever: { type: Boolean, required: true },
  nausea: { type: Boolean, required: true },
  fatigue: { type: Boolean, required: true },
  headache: { type: Boolean, required: true },
  congestion: { type: Boolean, required: true },
  status: { type: String, required: true },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
