const { db } = require("../index.js");
const authHelpers = require("../../auth/helpers");

const addUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password);

  db.none(
    "INSERT INTO users(username, email, password_digest) VALUES (${username}, ${email}, ${password})",
    { username: req.body.username, email: req.body.email, password: hash }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "User successfully added!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const editUser = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(",");
  if (req.body.username && req.body.username.toLowerCase() === "null") {
    req.body.username = null;
  }
  if (req.body.email && req.body.email.toLowerCase() === "null") {
    req.body.email = null;
  }
  if (req.body.password && req.body.password.toLowerCase() === "null") {
    req.body.password = null;
  }
  if (req.body.profile_pic && req.body.profile_pic.toLowerCase() === "null") {
    req.body.profile_pic = null;
  }

  db.none(
    "UPDATE users SET " + queryString + " WHERE id=" + req.params.id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "User successfully updated!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const deleteUser = (req, res, next) => {
  db.result("DELETE FROM users WHERE id=$1", [+req.params.id])
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "deleted user",
        body: result
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = { addUser, editUser, deleteUser };
