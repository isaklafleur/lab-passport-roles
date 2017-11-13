passport.use(
  new FbStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENTSECRET,
      callbackURL: FACEBOOK_CALLBACKURL,
      profileFields: ["id", "displayName", "photos", "email", "gender", "name"]
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('profile', JSON.stringify(profile, null, 2));
      User.findOne(
        {
          email: profile.emails[0].value
        },
        (err, user) => {
          if (err) {
            console.log(err); // handle errors!
          }
          // console.log('user: ', user);
          if (!err && user !== null) {
            const updateuser = {
              facebookId: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value
                ? profile.photos[0].value
                : "/images/userProfileIcon.jpg"
            };
            User.findOneAndUpdate(
              { email: profile.emails[0].value },
              updateuser,
              (err, result) => {}
            );
          } else {
            // console.log('profile', JSON.stringify(profile, null, 2));
            const newuser = new User({
              facebookId: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value
                ? profile.photos[0].value
                : "/images/userProfileIcon.jpg",
              email: profile.emails[0].value
            });
            newuser.save(err => {
              if (err) {
                console.log(err); // handle errors!
              } else {
                done(null, user);
              }
            });
          }
        }
      );
      done(null, profile);
    }
  )
);
