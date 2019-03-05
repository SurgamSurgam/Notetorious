const express = require("express");
const router = express.Router();
const {
  getAllTags,
  getAllTagsFromAllUsers,
  getSingleTag,
  addTagWithNoteId,
  editTag,
  deleteTag,
  addTagGenerallyWithoutNoteRef
} = require("../db/queries/tagsQueries.js");

const { loginRequired } = require("../auth/helpers.js");

/* GET users listing. */
router.get("/", loginRequired, getAllTags);
router.get("/all_tags", loginRequired, getAllTagsFromAllUsers);
router.get("/:tag_id", loginRequired, getSingleTag);
router.post("/user/note/:note_id", loginRequired, addTagWithNoteId);
router.post("/", loginRequired, addTagGenerallyWithoutNoteRef);
router.patch("/:tag_id", loginRequired, editTag);
router.delete("/:tag_id", loginRequired, deleteTag);

module.exports = router;
