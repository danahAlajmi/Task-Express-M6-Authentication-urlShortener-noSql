const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_SECRET, JWT_EXP } = require("../secret/keys");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const foundUser = await User.findOne({
      username, // equivalent to { name : name }
    });
    const isMatch = foundUser
      ? await bcrypt.compareSync(password, foundUser.password)
      : false;

    return isMatch ? done(null, foundUser) : done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) done(null, user);
      else done(null, false);
    } catch (error) {
      done(error);
    }
  }
);
