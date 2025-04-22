const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_API_KEY,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
    },
    callbackFn
  )
);

function callbackFn(accessToken, refreshToken, profile, cb) {
  console.log({ profile });
}
