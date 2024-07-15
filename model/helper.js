require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS,
  database: process.env.DB_NAME || "photo_gis",
  multipleStatements: true
});

function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return reject(err);
      }

      connection.beginTransaction(err => {
        if (err) {
          connection.release();
          console.error('Error beginning transaction:', err);
          return reject(err);
        }

        connection.query(query, values, (err, result) => {
          if (err) {
            connection.rollback(() => {
              connection.release();
              console.error('Error rolling back transaction:', err);
              return reject(err);
            });
          }

          connection.commit(err => {
            if (err) {
              connection.rollback(() => {
                connection.release();
                console.error('Error committing transaction:', err);
                return reject(err);
              });
            }

            connection.release();
            resolve(result);
          });
        });
      });
    });
  });
}

module.exports = {
  executeQuery
};
