const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getAllNotesFromSingleNotebook,
  getAllNotesFromTag,
  getSingleNoteFromNotebook,
  addNote,
  editNote,
  deleteNote
} = require("../db/queries/notesQueries.js");

/* GET users listing. */
router.get("/user/:user_id", getAllNotes);
router.get("/user/:user_id/:notebook_id", getAllNotesFromSingleNotebook);
router.get("/user/:user_id/tag/:tag_name", getAllNotesFromTag);
router.get("/user/:user_id/:notebook_id/:note_id", getSingleNoteFromNotebook);
router.post("/user/:user_id/:notebook_id", addNote);
router.patch("/user/:user_id/:notebook_id/:note_id", editNote);
router.delete("/user/:user_id/:notebook_id/:note_id", deleteNote);

module.exports = router;
