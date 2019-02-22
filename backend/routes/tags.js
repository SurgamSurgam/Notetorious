const express = require("express");
const router = express.Router();
const {
  getAllTags,
  getSingleTag,
  addTag,
  editTag,
  deleteTag
} = require("../db/queries/tagsQueries.js");

/* GET users listing. */
router.get("/user/:user_id", getAllTags);
router.get("/user/:user_id/:tag_id", getSingleTag);
router.post("/user/note/:note_id", addTag);
router.patch("/:tag_id", editTag);
router.delete("/:tag_id", deleteTag);

module.exports = router;
