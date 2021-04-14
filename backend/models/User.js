const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: String,
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose, { usernameField : 'email'});
module.exports = mongoose.model('User', userSchema);