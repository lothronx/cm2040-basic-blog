//------------------------- START OF MY CODE -------------------------//
module.exports = function (req, res, next) {
  if (!req.session.isLoggedIn) {
    return res.status(401).send("Access denied. Not logged in.");
  }
  next();
};
//------------------------- END OF MY CODE -------------------------//