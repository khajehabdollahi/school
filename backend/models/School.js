const mongoose = require("mongoose");

let schoolModel = new mongoose.Schema({
  nameOfTheSchool: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  address: {
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }
  },
  economyLevel: {
    type: Number
  },
  teacherOrManagersName: {
    type: String
  },
  numberOfClasses: {
    type: Number
  },
  numberOfStudents: {
    type: Number
  },
  gender: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('School', schoolModel);