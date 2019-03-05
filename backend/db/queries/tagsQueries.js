const db = require("../index.js");

const getAllTagsFromAllUsers = (req, res, next) => {

  db.any("SELECT * FROM tags")
    .then(tags => {
      res.status(200).json({
        status: "success",
        message: "Got all tags everywhere from ALL users.",
        body: tags
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllTags = (req, res, next) => {

  db.any(
    "SELECT name FROM taggings JOIN notes ON taggings.note_id=notes.id JOIN tags ON tags.id=taggings.tag_id WHERE notes.author_id=$1",
    [req.session.currentUser.id]
  )
    .then(tags => {
      res.status(200).json({
        status: "success",
        message: "Got all tags from this ONE user.  (From all notebooks!)",
        body: tags
      });
    })
    .catch(error => {
      next(error);
    });
};

const getSingleTag = (req, res, next) => {
  let tag_id = req.params.tag_id;

  db.one(
    "SELECT * FROM taggings JOIN notes ON taggings.note_id=notes.id JOIN tags ON tags.id=taggings.tag_id WHERE notes.author_id=$1 AND tags.name=$2",
    [req.session.currentUser.id, tag_id]
  )
    .then(note => {
      res.status(200).json({
        status: "success",
        message:
          "Got single tag from this user and all notes related to that tag. (ignoring notebooks!)",
        body: note
      });
    })
    .catch(error => {
      next(error);
    });
};

const addTagWithNoteId = async (req, res, next) => {
  let note_id = +req.params.note_id;

  try {
    let tag_id = await db.one(
      "INSERT INTO tags(name) VALUES (${name}) RETURNING id",
      req.body
    );
    await db.none("INSERT INTO taggings(note_id, tag_id) VALUES ($1, $2)", [
      note_id,
      tag_id.id
    ]);

    res.status(200).json({
      status: "success",
      message: "Note successfully added to note!"
    });
  } catch (error) {
    console.error("Error from ASYNC/AWAIT");
    next(error);
  }
};

const addTagGenerallyWithoutNoteRef = (req, res, next) => {
    db.none(
      "INSERT INTO tags(name) VALUES (${name})",
      req.body
    ).then(()=> {
      res.status(200).json({
        status: "success",
        message: "Note successfully added generally (not pointing to any note)!"
      });
    }).catch(error => {
      next(error);
    });
};

const editTag = (req, res, next) => {
  db.none("UPDATE tags SET name=${name}, id=${id} WHERE id=${id}", {
    name: req.body.name,
    id: +req.params.tag_id
  })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Tag successfully updated!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const deleteTag = (req, res, next) => {
  db.result("DELETE FROM tags WHERE id=$1", [+req.params.tag_id])
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "Tag deleted!",
        body: result
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = {
  getAllTagsFromAllUsers,
  getAllTags,
  getSingleTag,
  addTagWithNoteId,
  editTag,
  deleteTag,
  addTagGenerallyWithoutNoteRef
};
