const express = require("express");
const app = express();
const mongoose = require('mongoose');
const School = require('./models/School');
const User = require('./models/User');
const bodyParser = require('body-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// TO GET DATA FROM INPUT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//TO CONNECT THE MONGODB
const db = "schooldb";
mongoose.connect('mongodb://localhost:27017/' + db, { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// TO GET SCHOOL INFO FROM MONGODB
app.get('/api/v1/school', (req, res) => {
  School.find({}, (err, result) => {
     res.send(result)
  })
})

// SAVE DATA (SCHOOL INFO) INTO DATABASE
app.post('/api/v1/school', async (req, res) => {
  try {
    await School.create(req.body, (err, data)=>{
      if (err) {
        res.json(err);
      }else{
        data.save();
        res.status(200).send('Submission successful!')
      }
    }) 
  } catch(e) {
      return res.status(404).send('Something wrong!');
  }
})

// SAVE USER INTO DATABASE
app.post('/register', async (req, res) => {
  let newUser= new User({
    username:req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber}),
    passWord = req.body.password;

  await User.register(newUser, passWord, (err, user) => {
    if(err){
      return res.status(404).send(err.message);
    }else{
      passport.authenticate('local')(req, res, () => {
        res.status(200).send('User registration successful!');
      });
    }
  }); 
});


app.post('/login', async (req, res, next) => {  
  await passport.authenticate('local', (err, user, info) => { 
    if (err) { 
      return next(err); 
    } 
    if (!user) { 
      return res.status(404).send("Username or Password incorrect!"); 
    } 
    req.logIn(user, (err) => { 
      if (err) { 
        return next(err); 
      } 
      return res.status(200)
        .send({id: user._id, username: user.username, role: user.role}); 
    }); 
  })(req, res, next); 
});
  


// ROUTE TO GET USER INFO FROM MONGODB
app.get('/api/v1/users', (req, res) => {
  User.find({}, (err, result) => {
     res.send(result)
  })
})
  

//SERVER CODE
const PORT = 5000;
app.listen(PORT, () => console.log(`School Backend is Running at ${PORT}`));