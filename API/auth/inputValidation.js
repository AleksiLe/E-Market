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

//All ts files converted to js files and add other necessary changes from: https://github.com/AleksiLe/AdvancedWebApplications/blob/main/Project/Server/auth/validateToken.ts