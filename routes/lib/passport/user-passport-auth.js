const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../../users/model/User");
const keys = process.env.JWT_SECRET;

const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;

const userJwtLoginStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  const userEmail = payload.email;
  console.log("--- user-passport-auth ---");
  console.log(userEmail);

  try {
    const user = await User.findOne({ email: userEmail }).select("-password");

    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  } catch (e) {
    console.log("--- user-passport-auth-error ---");
    console.log(e);
    return done(e, false);
  }
});

module.exports = userJwtLoginStrategy;

/* Once updateProfile function is called, passport makes a new strategy and serializes the object for future use. It can be deserialized so that we can see what is in the object. If these checks fail, like 20 will run throwing false and creating an error. */
