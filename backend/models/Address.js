let mongoose = require("mongoose");

let addressModel = new mongoose.Schema({
    province: {
      type: String,
      required: true
    },
    nameOfCity: {
      type: String,
      required: true
    },
    nameOfDistrict: {
      type: String        
    },
    nameOfVillag: {
      type: String
    }
});

module.exports = mongoose.model('Address', addressModel);