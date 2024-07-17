require("dotenv").config();
const mysql = require("mysql"); 

// Create MySQL connection pool with configurable parameters
const pool = mysql.createPool({
  connectionLimit: 10, // Limit number of connections in the pool
  host: process.env.DB_HOST || "127.0.0.1", 
  user: process.env.DB_USER || "root", 
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME || "photo_gis", // Database name, default to photo_gis
  multipleStatements: true
});

// Function to execute SQL queries using a connection from the pool
function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err); // Log connection error
        return reject(err); // Reject promise with error
      }

      connection.beginTransaction(err => {
        if (err) {
          connection.release();
          console.error('Error beginning transaction:', err); // Log transaction begin error
          return reject(err); // Reject promise with error
        }

        connection.query(query, values, (err, result) => {
          if (err) {
            connection.rollback(() => {
              connection.release();
              console.error('Error rolling back transaction:', err); // Log transaction rollback error
              return reject(err); // Reject promise with error
            });
          }

          connection.commit(err => {
            if (err) {
              connection.rollback(() => {
                connection.release();
                console.error('Error committing transaction:', err); // Log transaction commit error
                return reject(err); // Reject promise with error
              });
            }

            connection.release(); // Release connection back to the pool
            resolve(result); // Resolve promise with query result
          });
        });
      });
    });
  });
}

module.exports = {
  executeQuery // Export executeQuery function for use in other modules
};
