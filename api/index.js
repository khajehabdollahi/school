const express = require("express");
const app = express();
const mongoose = require("mongoose");
const School = require("./models/School");
const User = require("./models/User");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mailer = require("./mailer");
const morgan = require("morgan");

// const forgetPass=require('password-reset')

// TO GET DATA FROM INPUT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//TO CONNECT THE MONGODB
const db = "schooldb";
mongoose.connect("mongodb://localhost:27017/" + db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const verify = () => {};

app.get("/dog", verify, (req, res) => {
  res.send("dog");
});

// TO GET SCHOOL INFO FROM MONGODB
app.get("/api/v1/school", (req, res) => {
  School.find({}, (err, result) => {
    res.send(result);
  });
});

// SAVE DATA (SCHOOL INFO) INTO DATABASE
app.post("/api/v1/school", async (req, res) => {
  try {
    await School.create(req.body, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        data.save();
        res.status(200).send("Submission successful!");
      }
    });
  } catch (e) {
    return res.status(404).send("Something wrong!");
  }
});

// Just a Test To Learn
app.get('/r/:learn', (req, res) => {
  const { learn } = req.params;
  console.log(`<h1>req.params</h1>`);
res.send(`It is what wasr requsted from browser: <h1> ${learn}</h1>`);
})

// SAVE USER INTO DATABASE
app.post("/api/register", async (req, res) => {
  let newUser = new User();
  newUser.username = req.body.username;
  // newUser.firstName = req.body.firstName;
  // newUser.lastName = req.body.lastName;
  // newUser.phoneNumber = req.body.phoneNumber
  newUser.password = req.body.password;

  await User.register(newUser, newUser.password, (err, user) => {
    if (err) {
      return res.status(404).send(err.message);
    } else {
      passport.authenticate("local")(req, res, async () => {
        res.status(200).send("User registration successful!");
        let { _id } = await User.findOne({ username: newUser.username });
        mailer(
          newUser.username,
          "Welcome to web",
          "Yes you are very welcome now \n please activate ur account by clicking this link\n \n http://localhost:5000/api/activate/" +
            _id
        ); //Detta lokal host ska ändras till domänen
      });
    }
  });
});

app.get("/api/activate/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  if (user) {
    user.activated = true;
    await user.save();
    //res.send("Account is activated now");
    res.redirect("http://localhost:3000/welcomeuser?id=" + req.params.id).end();
  } else {
    res.send("Activation Failed");
  }
});

app.post("/api/login", async (req, res, next) => {
  await passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send("Username or Password incorrect!");
    } else if (!user.activated) {
      return res.status(404).send("User is not Activated, pls Activate!");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .send({ id: user._id, username: user.username, role: user.role });
    });
  })(req, res, next);
  res.redirect('/about')
});

// ROUTE TO GET USER INFO FROM MONGODB
app.get("/api/v1/users", (req, res) => {
  User.find({}, (err, result) => {
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("Here is the homePage");
});

//Rset Password schoolreset@gmail.com Asdf!1234

app.get("/school/:id", async (req, res) => {
  res.render("src/SchoolPage");
});

//SERVER CODE
const PORT = 5000;
app.listen(PORT, () => console.log(`School Backend is Running at ${PORT}`));

//https://www.youtube.com/watch?v=kfw61IxDgW8 forget Password
