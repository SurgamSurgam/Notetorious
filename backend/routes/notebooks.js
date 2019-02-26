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
router.get("/", loginRequired, getAllNotebooks);
router.get("/:notebook_id", loginRequired, getSingleNotebook);
router.post("/",loginRequired, addNotebook);
router.patch("/:notebook_id", loginRequired, editNotebook);
router.delete("/:notebook_id", loginRequired, deleteNotebook);

module.exports = router;
