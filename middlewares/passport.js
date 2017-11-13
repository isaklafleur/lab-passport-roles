require("dotenv").config();
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FbStrategy = require("passport-facebook").Strategy;

// Require the Mongoose models
const User = require("../models/user.js");

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return cb(err);
    }
    return cb(null, user);
  });
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          req.flash("error", "Incorrect username");
          return next(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          req.flash("error", "Incorrect password");
          return next(null, false);
        }

        return next(null, user);
      });
    }
  )
);

passport.use(
  new FbStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACKURL,
      profileFields: ["id", "displayName", "photos", "email", "gender", "name"]
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('profile', JSON.stringify(profile, null, 2));
      console.log("facebook profile: ", profile);
      User.findOne(
        {
          username: profile.emails[0].value
        },
        (err, user) => {
          if (err) {
            done(err);
          } else if (user) {
            // console.log('user: ', user);
            const updateuser = {
              facebookId: profile.id,
              name: profile.displayName
            };
            User.findOneAndUpdate(
              { username: profile.emails[0].value },
              updateuser,
              (err, result) => {
                done(err, user);
              }
            );
          } else {
            console.log("user does not exist! You should signup!");
          }
        }
      );
    }
  )
);

module.exports = passport;
