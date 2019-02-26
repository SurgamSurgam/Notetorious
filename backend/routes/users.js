const express = require("express");
const router = express.Router();
const {
  addUser,
  editUser,
  deleteUser
} = require("../db/queries/usersQueries.js");

const { loginRequired } = require("../auth/helpers.js");

/* GET users listing. */
router.post("/", addUser);
router.patch("/", loginRequired, editUser);
router.delete("/", loginRequired, deleteUser);

module.exports = router;
