const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: String,
    activated: {
        type: Boolean,
        default:false
    }
}
);

//userSchema.plugin(passportLocalMongoose, { usernameField : 'email'});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);