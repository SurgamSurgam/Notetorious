const express = require("express");
const router = express.Router();
const {
  addUser,
  editUser,
  deleteUser
} = require("../db/queries/usersQueries.js");

/* GET users listing. */
router.post("/", addUser);
router.patch("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
