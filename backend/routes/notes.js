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

const { loginRequired } = require("../auth/helpers.js");

/* GET users listing. */
router.get("/user/:user_id", loginRequired, getAllNotes);
router.get("/user/:user_id/:notebook_id", loginRequired, getAllNotesFromSingleNotebook);
router.get("/user/:user_id/tag/:tag_name", loginRequired, getAllNotesFromTag);
router.get("/user/:user_id/:notebook_id/:note_id", loginRequired, getSingleNoteFromNotebook);
router.post("/user/:user_id/:notebook_id", loginRequired, addNote);
router.patch("/user/:user_id/:notebook_id/:note_id", loginRequired, editNote);
router.delete("/user/:user_id/:notebook_id/:note_id", loginRequired, deleteNote
);

module.exports = router;
