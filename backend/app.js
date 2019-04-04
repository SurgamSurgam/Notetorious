var createError = require("http-errors");
var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("./auth/local.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.js");
var notebooksRouter = require("./routes/notebooks.js");
var notesRouter = require("./routes/notes.js");
var tagsRouter = require("./routes/tags.js");
var sessionsRouter = require("./routes/sessions.js");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// most app.use below:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("in pursuit of it all"));

// passport stuff below:

app.use(
  session({
    secret: "in pursuit of it all",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport stuff above:

app.use(express.static(path.join(__dirname, "../frontend/build")));


app.use("/api/users", usersRouter);
app.use("/api/notebooks", notebooksRouter);
app.use("/api/notes", notesRouter);
app.use("/api/tags", tagsRouter);
app.use("/sessions", sessionsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../frontend/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
