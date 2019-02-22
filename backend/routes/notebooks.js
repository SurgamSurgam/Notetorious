const express = require("express");
const router = express.Router();
const {
  getAllNotebooks,
  getSingleNotebook,
  addNotebook,
  editNotebook,
  deleteNotebook
} = require("../db/queries/notebooksQueries.js");

/* GET users listing. */
router.get("/user/:user_id", getAllNotebooks);
router.get("/user/:user_id/:notebook_id", getSingleNotebook);
router.post("/user/:user_id", addNotebook);
router.patch("/user/:user_id/:notebook_id", editNotebook);
router.delete("/user/:user_id/:notebook_id", deleteNotebook);

module.exports = router;
