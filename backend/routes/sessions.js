const express = require("express");
const router = express.Router();
const passport = require("../auth/local.js");
const { loginRequired } = require("../auth/helpers.js");

const {
  logoutUser,
  loginUser,
  isLoggedIn
} = require("../db/queries/sessionsQueries.js");

/* GET users listing. */

router.post("/login", passport.authenticate("local", {}), loginUser);
router.get("/isLoggedIn", isLoggedIn);
router.post("/logout", loginRequired, logoutUser);

module.exports = router;
