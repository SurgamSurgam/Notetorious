const express = require("express");
const router = express.Router();
const {
  getAllTags,
  getSingleTag,
  addTag,
  editTag,
  deleteTag
} = require("../db/queries/tagsQueries.js");

const { loginRequired } = require("../auth/helpers.js");

/* GET users listing. */
router.get("/user/:user_id", loginRequired, getAllTags);
router.get("/user/:user_id/:tag_id", loginRequired, getSingleTag);
router.post("/user/note/:note_id", loginRequired, addTag);
router.patch("/:tag_id", loginRequired, editTag);
router.delete("/:tag_id", loginRequired, deleteTag);

module.exports = router;
