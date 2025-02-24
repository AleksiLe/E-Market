const express = require('express');

const router = express.Router();
const User = require('../../config/dbModels/user');
const { validateToken } = require("../../auth/validateToken");
const { validateEmail, validatePassword } = require("../../auth/inputValidation");
const bcrypt = require("bcrypt");
const { ValidationError, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// post /api/user/register - Insert new user
router.post(
    "/register",
    validateEmail,
    validatePassword,
    async (req, res) => {   
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  
        try {
            const existingUser = await User.findOne({
                email: req.body.email,
            });
    
            if (existingUser) {
                return res
                .status(403)
                .json({ success: false, message: "Email already in use." });
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            await User.create({
            email: req.body.email,
            password: hash,
            username: req.body.username,
            }).then((user) => {
                user.save();
            });
            console.log("User registered successfully.");
            return res
                .status(200)
                .json({ success: true, message: "User registered successfully." });
        
        } catch (error) {
            console.error(`Error during user registration: ${error}`);
            return res
                .status(500)
                .json({ success: false, error: "Internal Server Error" });
            }
    }
);

// post /api/user/login - Login user
router.post("/login", validateEmail, async (req, res) => {
try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
    return res.status(403).json({ success: false, message: "Login failed" });
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
    const jwtPayload = {
        id: user._id,
        email: user.email,
    };
    const token = jwt.sign(
        jwtPayload,
        process.env.JWT_SECRET,
        {
        expiresIn: "1h",
        }
    );
    return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, message: "Login failed" });
} catch (error) {
    console.error(`Error during user login: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
}
});

// post /api/user/change_email - Change user email
router.post("/change_email", validateToken, async (req, res) => {
    try {
        const newEmail = req.body.newEmail;
        //Check if the new email is already in use
        const existingUser = await User.findOne({ email: newEmail });
            if (existingUser) {
                return res
                .status(403)
                .json({ success: false, message: "Email already in use." });
            }
        req.user.email = newEmail;
        await req.user.save();
        return res.json({ success: true });
    }   catch (error) {
        console.log(`Error during email change: ${error}`);
        return res.json({ success: false, message: error });
    }
});

// post /api/user/change_password - Change user password
router.post("/change_password", validateToken, async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        req.user.password = hash;
        await req.user.save();
        return res.json({ success: true });
    }   catch (error) {
        console.log(`Error during email change: ${error}`);
        return res.json({ success: false, message: error });
    }
});   

// post /api/user/verify - Verify user
router.post("/verify", validateToken, (req, res) => {
    try {
      return res.json({ success: true });
    } catch (error) {
      console.log(`Error during user verification: ${error}`);
      return res.json({ success: false, message: error });
    }
});

module.exports = router;