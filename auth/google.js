const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      callbackURL: "https://seusite/google/callback",
    },
    (accessToken, refreshToken, profile, done) => { 

        /**
         * @param profile - contem os dados do usuario
         */
   
        passport.serializeUser((user, done) => {
          done(null, user._id);
        });
    
        passport.deserializeUser((id, done) => {
          try {
            const user = findUserById(id);
            done(null, user);
          } catch (err) {
            console.log(err);
            return done(err, null);
          }
        });  

        /**
         * Fazer algo com os dados recebidos, se tudo estiver ok, use:
         * return done(null, user);
         * Se parar em uma condição que negue o acesso, use:
         * return done(err, false);
         */
        

        /**
         * EXEMPLO:
         */
        if (findUser(user.email)) {
          try {
            return done(null, user);
          } catch (err) {
            console.log(err);
            return done(err, false);
          }
        } else {
            //Algum err...
            return done(err, false);
        }
    }
  )
);

module.exports = passport;