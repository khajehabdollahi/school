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
    },     
    firstName: String,
    lastName: String,
    phoneNumber: String,
}
);



//userSchema.plugin(passportLocalMongoose, { usernameField : 'email'});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);


exports.register=(modelUser,pass)=> {
    return new Promise((resolve, reject) => {
        modelUser.save(err, (newu) => {
            if(err) reject('error in new create user')
            resolve(newu)
        });
    });
}

