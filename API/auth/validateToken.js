const passport = require("./passport-config");

const validateToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, verifiedUser) => {
    if (err || !verifiedUser) {
      return res.sendStatus(401);
    }
    req.user = verifiedUser;
    next();
  })(req, res, next);
};

module.exports = { validateToken };