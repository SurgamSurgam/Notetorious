const db = require("../index.js");

let currentUser;

const getCurrentUser = (user) =>{
  currentUser=user;
}

const getAllNotebooks = (req, res, next) => {
  console.log('DEYVI', req.user, 'currentUser', currentUser)// add this id to all params.user_id - iow - when user is logged in then I would have access to all ids
  let user_id = +req.params.user_id;
  db.any("SELECT * FROM notebooks WHERE author_id=$1", [user_id])
    .then(notebooks => {
      res.status(200).json({
        status: "success",
        message: "Got all notebooks from this user!",
        body: notebooks
      });
    })
    .catch(error => {
      next(error);
    });
};

const getSingleNotebook = (req, res, next) => {
  let user_id = +req.params.user_id;
  let notebook_id = +req.params.notebook_id;
  db.one("SELECT * FROM notebooks WHERE author_id=$1 AND id=$2", [
    user_id,
    notebook_id
  ])
    .then(notebook => {
      res.status(200).json({
        status: "success",
        message: "Got single notebook from this user!",
        body: notebook
      });
    })
    .catch(error => {
      next(error);
    });
};

const addNotebook = (req, res, next) => {
  req.body.is_default = req.body.is_default ? req.body.is_default : false;
  db.none(
    "INSERT INTO notebooks(author_id, title, is_default) VALUES (${author_id}, ${title}, ${is_default})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Notebook successfully added to this user!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const editNotebook = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(",");
  if (req.body.title && req.body.title.toLowerCase() === "null") {
    req.body.title = null;
  }
  if (req.body.is_default && req.body.is_default.toLowerCase() === "null") {
    req.body.is_default = false;
  }

  db.none(
    "UPDATE notebooks SET " +
      queryString +
      " WHERE author_id=" +
      +req.params.user_id +
      " AND id=" +
      +req.params.notebook_id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Notebook successfully updated!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const deleteNotebook = (req, res, next) => {
  db.result("DELETE FROM notebooks WHERE author_id=$1 AND id=$2", [
    +req.params.user_id,
    +req.params.notebook_id
  ])
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "Deleted notebook for this user!",
        body: result
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = {
  getAllNotebooks,
  getSingleNotebook,
  addNotebook,
  editNotebook,
  deleteNotebook,
  getCurrentUser
};
