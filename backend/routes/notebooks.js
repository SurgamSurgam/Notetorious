const express = require("express");
const router = express.Router();
const {
  getAllNotebooks,
  getSingleNotebook,
  addNotebook,
  editNotebook,
  deleteNotebook
} = require("../db/queries/notebooksQueries.js");

const { loginRequired } = require("../auth/helpers.js");

/* GET users listing. */
router.get("/user/:user_id", loginRequired, getAllNotebooks);
router.get("/user/:user_id/:notebook_id", loginRequired, getSingleNotebook);
router.post("/user/:user_id",loginRequired, addNotebook);
router.patch("/user/:user_id/:notebook_id", loginRequired, editNotebook);
router.delete("/user/:user_id/:notebook_id", loginRequired, deleteNotebook);

module.exports = router;
