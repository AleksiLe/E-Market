const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../config/dbModels/user");

passport.initialize();

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtStrategy = new Strategy(jwtStrategyOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

module.exports = passport;