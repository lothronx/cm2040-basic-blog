//------------------------- START OF MY CODE -------------------------//
const express = require("express");
const router = express.Router();
// import the helper functions
const helpers = require("../helpers/helpers");

/**
 * @route GET /
 * @desc retrieve the blog information and all published articles from the database and render the reader-home page
 */
router.get("/", async (req, res, next) => {
  const queryBlog = "SELECT * FROM blog";
  const queryArticles = "SELECT * FROM articles WHERE published = 1 ORDER BY published_at DESC";
  const queryPassword = "SELECT password FROM blog";

  try {
    // retrieve the blog information from the database
    const blog = await helpers.get(queryBlog);

    // retrieve all the published articles from the database
    const articles = await helpers.all(queryArticles);
    // convert the UTC time to local time in the article metadata
    const localizedArticles = articles.map((article) => helpers.toLocalTime(article));

    // check if the user has set a password
    // if the user has not set a password, the link should direct to the register page
    // if the user has set a password but has not logged in, the link should direct to the login page
    // if the user has logged in, the link should direct to the author - home page
    const password = await helpers.get(queryPassword);
    let link = "";
    if (!password.password) {
      link = "/auth/register";
    } else if (!req.session.isLoggedIn) {
      link = "/auth/login";
    } else {
      link = "/admin";
    }

    // render the reader-home page
    res.render("reader-home", { blog: blog, articles: localizedArticles, link: link });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
//------------------------- END OF MY CODE -------------------------//
