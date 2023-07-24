//------------------------- START OF MY CODE -------------------------//
// import the moment package
const moment = require("moment");

module.exports = {
  /**
   * @desc a helper function to turn the sqlite3 db.get() function into a JS promise object
   * @returns a promise object that resolves to the row object returned by the db.get() function
   */
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      global.db.get(sql, params, function (err, row) {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  /**
   * @desc a helper function to turn the sqlite3 db.all() function into a JS promise object
   * @returns a promise object that resolves to the rows array returned by the db.all() function
   */
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      global.db.all(sql, params, function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  /**
   * @desc a helper function to turn the sqlite3 db.run() function into a JS promise object
   * @returns a promise object
   */
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      global.db.run(sql, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this);
      });
    });
  },

  /**
   * @desc a helper function to convert the UTC time to local time in the article metadata
   * @input an article with UTC time
   * @returns an article with the UTC time converted to local time
   */
  toLocalTime: (article) => {
    return {
      ...article,
      created_at: moment.utc(article.created_at).local().format("YYYY-MM-DD HH:mm:ss"),
      last_modified_at: moment.utc(article.last_modified_at).local().format("YYYY-MM-DD HH:mm:ss"),
      published_at: moment.utc(article.published_at).local().format("YYYY-MM-DD HH:mm:ss"),
    };
  },
};
//------------------------- END OF MY CODE -------------------------//