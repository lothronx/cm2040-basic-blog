//------------------------- START OF MY CODE -------------------------//
const express = require("express");
const router = express.Router();
// import the helper functions
const helpers = require("../helpers/helpers");

/**
 * @route GET /articles/:id
 * @desc retrieve a single article and all its comment and render the reader - article page
 */
router.get("/:id", async (req, res, next) => {
  const queryArticle = "SELECT * FROM articles WHERE id = ?;";
  const queryComments = "SELECT * FROM comments WHERE article_id = ? ORDER BY created_at DESC;";

  try {
    // retrieve a single article from the database
    const article = await helpers.get(queryArticle, req.params.id);
    // convert the UTC time to local time in the article metadata
    const localizedArticle = helpers.toLocalTime(article);

    // retrieve all comments for the article from the database
    const comments = await helpers.all(queryComments, req.params.id);

    // render the reader - article page
    res.render("reader-article", { article: localizedArticle, comments: comments });
  } catch (error) {
    return next(error);
  }
});

/**
 * @route POST /articles/:id
 * @desc post a comment and refresh the page
 */
router.post("/:id", async (req, res, next) => {
  const postComment = "INSERT INTO comments (content, article_id) VALUES (?, ?);";
  const params = [req.body.content, req.params.id];

  try {
    // insert a comment into the database
    await helpers.run(postComment, params);
    // refresh the page
    res.redirect("back");
  } catch (error) {
    return next(error);
  }
});

/**
 * @route POST /articles/:id/likes
 * @desc update likes and refresh the page
 */
router.post("/:id/likes", async (req, res, next) => {
  const updateLikes = "UPDATE articles SET likes = likes + 1 WHERE id = ?;";

  try {
    // update the likes for the article
    await helpers.run(updateLikes, req.params.id);
    // refresh the page
    res.redirect("back");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
//------------------------- END OF MY CODE -------------------------//
