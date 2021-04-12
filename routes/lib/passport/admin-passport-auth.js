const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Admin = require("../../admin/model/Admin");
const keys = process.env.JWT_SECRET;

const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;

const adminJwtLoginStrategy = new JwtStrategy(
  jwtOpts,
  async (payload, done) => {
    const adminEmail = payload.email;

    try {
      const admin = await (
        await Admin.findOne({ email: adminEmail })
      ).isSelected("-password");

      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (e) {
      return done(e, false);
    }
  }
);

module.exports = adminJwtLoginStrategy;
