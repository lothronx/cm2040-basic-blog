//------------------------- START OF MY CODE -------------------------//

const express = require("express");
const router = express.Router();
// import the helper functions
const helpers = require("../helpers/helpers");
// import the validation middleware
const validate = require("../middleware/validation");
// import the authorization middleware
const auth = require("../middleware/auth");

/**
 * @route GET /admin/articles/new
 * @desc render the author - new article page
 */
router.get("/new", auth, (req, res) => {
  res.render("author-new-draft");
});

/**
 * @route POST /admin/articles/new
 * @desc insert a new article into the database and redirect to the author - home page
 */
router.post("/new", auth, validate.articleSchema, async (req, res, next) => {
  const postArticle = "INSERT INTO articles (title, subtitle, content) VALUES (?, ?, ?);";
  const params = [req.body.title, req.body.subtitle, req.body.content];

  try {
    // insert an article into the database
    await helpers.run(postArticle, params);
    // redirect to the author - home page
    res.redirect("..");
  } catch (error) {
    return next(error);
  }
});

/**
 * @route GET /admin/articles/:id
 * @desc retrieve one articles from the database and render the author - edit article page
 */
router.get("/:id", auth, async (req, res, next) => {
  const queryArticle = "SELECT * FROM articles WHERE id = ?;";
  const params = [req.params.id];

  try {
    // retrieve one article from the database
    const article = await helpers.get(queryArticle, params);
    // render the author - edit article page
    res.render("author-edit-article", { article: article });
  } catch (error) {
    return next(error);
  }
});

/**
 * @route POST /admin/articles/:id
 * @desc update an article and reload the page to display the updated information
 */
router.post("/:id", auth, validate.articleSchema, async (req, res, next) => {
  const updateArticle =
    "UPDATE articles SET last_modified_at = datetime('now'), title = ?, subtitle = ?, content = ? WHERE id = ?;";
  const params = [req.body.title, req.body.subtitle, req.body.content, req.params.id];

  try {
    // update an article
    await helpers.run(updateArticle, params);
    // redirect to the author - home page
    res.redirect("..");
  } catch (error) {
    return next(error);
  }
});

/**
 * @route POST /admin/articles/:id/publish
 * @desc publish an article and reload the page to display the updated information
 */
router.post("/:id/publish", auth, async (req, res, next) => {
  const publishArticle =
    "UPDATE articles SET published = 1, published_at = datetime('now') WHERE id = ?;";
  const params = [req.params.id];

  try {
    // publish an article
    await helpers.run(publishArticle, params);
    // reload the page to display the updated information
    res.redirect("back");
  } catch (error) {
    return next(error);
  }
});

/**
 * @route POST /admin/articles/:id/delete
 * @desc delete an article from the database and reload the page to display the updated information
 */
router.post("/:id/delete", auth, async (req, res, next) => {
  const deleteArticle = "DELETE FROM articles WHERE id = ?;";
  const deleteComments = "DELETE FROM comments WHERE article_id = ?;";
  const params = [req.params.id];

  try {
    // delete an article from the database
    await helpers.run(deleteArticle, params);
    // delete all comments associated with the article
    await helpers.run(deleteComments, params);
    // reload the page to display the updated information
    res.redirect("back");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
//------------------------- END OF MY CODE -------------------------//  