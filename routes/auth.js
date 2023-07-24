//------------------------- START OF MY CODE -------------------------//
const express = require("express");
const router = express.Router();
// import the helper functions
const helpers = require("../helpers/helpers");
// import the validation middleware
const validate = require("../middleware/validation");
// import bcrypt
const bcrypt = require("bcrypt");

/**
 * @route GET /register
 * @desc render the register page
 */
router.get("/register", async (req, res, next) => {
  res.render("auth-register");
});

/**
 * @route POST /register
 * @desc record the hashed password in the database and redirect to the login page
 */
router.post("/register", validate.passwordSchema, async (req, res, next) => {
  const setPassword = "UPDATE blog SET PASSWORD = ?;";

  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // record the hashed password in the database
    await helpers.run(setPassword, hashedPassword);

    // redirect to the login page
    res.redirect("../../auth/login");
  } catch (error) {
    return next(error);
  }
});

/**
 * @route GET /login
 * @desc render the login page
 */
router.get("/login", async (req, res, next) => {
  res.render("auth-login");
});

/**
 * @route POST /login
 * @desc compare the password from the request body with the stored password, set the session to logged in and redirect to the admin page
 */
router.post("/login", async (req, res, next) => {
  const queryPassword = "SELECT password FROM blog";

  try {
    // retrieve the stored password from the database
    const storedPassword = await helpers.get(queryPassword);
    // compare the password from the request body with the stored password
    const validPassword = await bcrypt.compare(req.body.password, storedPassword.password);
    // if the password is invalid, send a 400 response
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }
    // otherwise, set the session to logged in and redirect to the admin page
    req.session.isLoggedIn = true;
    res.redirect("../../admin");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
//------------------------- END OF MY CODE -------------------------//
