const sqlite3 = require("sqlite3").verbose();

// Returns object array of queried results.
function selectAll(query) {
  return new Promise((resolve, reject) => {
    // Prevent injection attacks
    let queryCheck = query.substr(0, 4);
    if (queryCheck == "DROP") {
      reject("failed");
    } else {
      // Opens db
      const db = new sqlite3.Database(
        "./auctionDB.db",
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (err) return console.error(err.message);
        }
      );
      let sql = query;
      let rowData = [];
      // Query db
      let data = db.all(query, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          rowData.push(row);
        });
        resolve(rowData);
        db.close();
      });
    }
  });
}

module.exports = { selectAll };
