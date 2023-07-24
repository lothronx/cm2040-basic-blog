require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
const session = require("express-session");

//items in the global namespace are accessible through out the node application
global.db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});

//set the app to use ejs for rendering
app.set("view engine", "ejs");

//------------------------- START OF MY CODE -------------------------//
// set the app to use the public folder for static resources
app.use(express.static("public"));
// set the app to use the body parser
app.use(express.urlencoded({ extended: true }));
// set the app to use the express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// the reader - home page
app.use("/", require("./routes/reader-home"));

// the reader - article page
app.use("/articles", require("./routes/reader-article"));

// the auth page
app.use("/auth", require("./routes/auth"));

// the author - home page
app.use("/admin", require("./routes/author-home"));

// the author - edit article page
app.use("/admin/articles", require("./routes/author-edit-article"));

// the author - settings page
app.use("/admin/settings", require("./routes/author-settings"));

//------------------------- END OF MY CODE -------------------------//

// listens for connections
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
