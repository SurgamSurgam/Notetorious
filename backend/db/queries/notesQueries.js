const db = require("../index.js");

const getAllNotes = (req, res, next) => {

  db.any("SELECT * FROM notes WHERE author_id=$1", [req.session.currentUser.id])
    .then(notes => {
      res.status(200).json({
        status: "success",
        message: "Got all notes from this user.  (From all notebooks!)",
        body: notes
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllNotesFromSingleNotebook = (req, res, next) => {
  db.any("SELECT * FROM notes WHERE author_id=$1 AND notebook_id=$2", [
    req.session.currentUser.id,
    +req.params.notebook_id
  ])
    .then(notes => {
      res.status(200).json({
        status: "success",
        message: "Got all notes from chosen notebook of this user!",
        body: notes
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllNotesFromTag = (req, res, next) => {
  db.any(
    "SELECT * FROM taggings JOIN notes ON taggings.note_id=notes.id JOIN tags ON taggings.tag_id=tags.id WHERE notes.author_id=$1 AND tags.name=$2",
    [req.session.currentUser.id, req.params.tag_name]
  )
    .then(tagnotes => {
      res.status(200).json({
        status: "success",
        message: "Got all notes for this tag!",
        body: tagnotes
      });
    })
    .catch(error => {
      next(error);
    });
};

const getSingleNoteFromNotebook = (req, res, next) => {
  let notebook_id = +req.params.notebook_id;
  let note_id = +req.params.note_id;
  db.one(
    "SELECT * FROM notes WHERE author_id=$1 AND notebook_id=$2 AND id=$3",
    [req.session.currentUser.id, notebook_id, note_id]
  )
    .then(note => {
      res.status(200).json({
        status: "success",
        message: "Got single note from chosen notebook of this user!",
        body: note
      });
    })
    .catch(error => {
      next(error);
    });
};

const addNote = (req, res, next) => {
  req.body.favorited = req.body.favorited ? req.body.favorited : false;
  db.none(
    "INSERT INTO notes(title, body, author_id, notebook_id, favorited) VALUES ($1, $2, $3, $4, $5)",
    [req.body.title, req.body.body, req.session.currentUser.id, req.body.notebook_id, req.body.favorited]
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Note successfully added to notebook!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const editNote = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(",");
  if (req.body.title && req.body.title.toLowerCase() === "null") {
    req.body.title = null;
  }
  if (req.body.body && req.body.body.toLowerCase() === "null") {
    req.body.body = null;
  }
  if (req.body.favorited && req.body.favorited.toLowerCase() === "null") {
    req.body.favorited = false;
  }

  db.none(
    "UPDATE notes SET " +
      queryString +
      " WHERE author_id=" +
      req.session.currentUser.id +
      " AND notebook_id=" +
      +req.params.notebook_id +
      " AND id=" +
      +req.params.note_id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Note successfully updated!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const deleteNote = (req, res, next) => {
  db.result(
    "DELETE FROM notes WHERE author_id=$1 AND notebook_id=$2 AND id=$3",
    [req.session.currentUser.id, +req.params.notebook_id, +req.params.note_id]
  )
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "Note deleted from notebook!",
        body: result
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = {
  getAllNotes,
  getAllNotesFromSingleNotebook,
  getAllNotesFromTag,
  getSingleNoteFromNotebook,
  addNote,
  editNote,
  deleteNote
};
