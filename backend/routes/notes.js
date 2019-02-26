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
router.get("/", loginRequired, getAllNotes);
router.get("/:notebook_id", loginRequired, getAllNotesFromSingleNotebook);
router.get("/tag/:tag_name", loginRequired, getAllNotesFromTag);
router.get("/:notebook_id/:note_id", loginRequired, getSingleNoteFromNotebook);
router.post("/:notebook_id", loginRequired, addNote);
router.patch("/:notebook_id/:note_id", loginRequired, editNote);
router.delete("/:notebook_id/:note_id", loginRequired, deleteNote
);

module.exports = router;
