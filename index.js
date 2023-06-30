require('dotenv').config();
const app = require('express')();
const passport = require('passport');
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.set("view engine", "ejs");

// setup session
app.use(
    session({
      secret: process.env.SESSIONSECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false,maxAge:1000*60},
    })
  );
  
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.ID,
        clientSecret: process.env.SECRET,
        callbackURL: "http://localhost:8000/oauth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        // Use the profile information to authenticate the user
        // ...
        // console.log(profile);
        cb(null, profile);
      }
    )
  );

  // store profile in session
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  // retrieve profile from session
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });


  app.get("/login", (req, res) => {
    res.render("login.ejs");
  });

  app.get(
    "/oauth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/oauth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/dashboard",{ user: req.user });
    }
  );


  app.get("/dashboard", (req, res) => {
    // check if user is logged in
    if (req.isAuthenticated()) {
      res.render("dashboard.ejs", { user: req.user });
    } else {
      res.redirect("/login");
    }
  });

  // logout
  app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

  app.listen(8000, () => {
    console.log("Server started on http://localhost:8000");
  });