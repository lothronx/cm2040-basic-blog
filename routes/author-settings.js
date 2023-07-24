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
 * @route GET /admin/settings
 * @desc retrieve the blog information and render the author - settings page
 */
router.get("/", auth, async (req, res, next) => {
  const queryBlog = "SELECT * FROM blog";

  try {
    // retrieve the blog information from the database
    const blog = await helpers.get(queryBlog);
    // render the author - settings page
    res.render("author-settings", { blog: blog });
  } catch (error) {
    return next(error);
  }
});

/**
 * @route POST /admin/settings
 * @desc update the blog information
 */
router.post("/", auth, validate.blogSchema, async (req, res, next) => {
  const updateBlog = "UPDATE blog SET title = ?, author = ?,  subtitle = ? WHERE id = 1";
  const params = [req.body.title, req.body.author, req.body.subtitle];

  try {
    // update the blog information
    await helpers.run(updateBlog, params);
    // redirect to the author - home page
    res.redirect(".");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
//------------------------- END OF MY CODE -------------------------//