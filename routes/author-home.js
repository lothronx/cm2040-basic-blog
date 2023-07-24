//------------------------- START OF MY CODE -------------------------//
const express = require("express");
const router = express.Router();
// import the helper functions
const helpers = require("../helpers/helpers");
// import the authorization middleware
const auth = require("../middleware/auth");

/**
 * @route GET /admin
 * @desc retrieve the blog information and all articles from the database and render the author - home page
 */
router.get("/", auth, async (req, res, next) => {
  const queryBlog = "SELECT * FROM blog";
  const queryDrafts = "SELECT * FROM articles WHERE published = 0 ORDER BY last_modified_at DESC";
  const queryArticles = "SELECT * FROM articles WHERE published = 1 ORDER BY published_at DESC";

  try {
    // retrieve the blog information from the database
    const blog = await helpers.get(queryBlog);

    // retrieve all unpublished articles from the database
    const drafts = await helpers.all(queryDrafts);
    // convert the UTC time to local time in the article metadata
    const localizedDrafts = drafts.map((draft) => helpers.toLocalTime(draft));

    // retrieve all published articles from the database
    const articles = await helpers.all(queryArticles);
    // convert the UTC time to local time in the article metadata
    const localizedArticles = articles.map((article) => helpers.toLocalTime(article));

    // render the author - home page
    res.render("author-home", {
      blog: blog,
      drafts: localizedDrafts,
      articles: localizedArticles,
      baseUrl: req.baseUrl,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

//------------------------- END OF MY CODE -------------------------//
