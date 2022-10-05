const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./auctionDB.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

function selectAll(query) {
  return new Promise((resolve, reject) => {
    let sql = query;
    resolve(db.all(query, []));
  });
}
let sql = "SELECT * FROM users";
console.log(
  db.all(sql, [], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    return row;
  })
);
