const { body } = require("express-validator");

const validateEmail = body("email").isEmail().trim().escape();

const validatePassword = body("password").isStrongPassword({
  minLength: 8,
  minUppercase: 1,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 1,
});

module.exports = { validateEmail, validatePassword };