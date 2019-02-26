// const db = require("../index.js");

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send("log out success");
};

const loginUser = (req, res) => {
  console.log('backend REQ.USER', req.user);
  res.json(req.user);
};

const isLoggedIn = (req, res) => {
  if (req.user) {
    res.json({ username: req.user });
  } else {
    res.json({ username: null });
  }
};

module.exports = { logoutUser, loginUser, isLoggedIn };
