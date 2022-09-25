const sqlite3 = require("sqlite3").verbose();
let sql;

const db = new sqlite3.Database(
  "./auctionDB.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);

// create table
// sql =
//   "CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,username,password,email)";
// db.run(sql);

// drop table
db.run("DROP TABLE users");

// insert data into database
// sql = `INSERT INTO users(first_name,last_name,username,password,email) VALUES (?,?,?,?,?)`;
// db.run(
//   sql,
//   ["fred", "fredson", "fred_user", "test2", "fred@gmail.com"],
//   (error) => {
//     if (error) {
//       return console.error(error.message);
//     }
//   }
// );

// delete data

// update data
// sql = `DELETE FROM users WHERE id = ?`;
// db.run(sql, [1], (error) => {
//   if (error) {
//     return console.error(error.message);
//   }
// });
// query database
sql = `SELECT * FROM users`;
db.all(sql, [], (error, rows) => {
  if (error) {
    return console.error(error.message);
  }
  rows.forEach((row) => console.log(row));
});
