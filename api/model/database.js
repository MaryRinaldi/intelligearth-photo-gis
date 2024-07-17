require("dotenv").config();
const mysql = require("mysql"); 
const fs = require("fs"); 

// Retrieve database connection details from environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Create MySQL connection object with provided or default values
const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  multipleStatements: true // Allow execution of multiple SQL statements
});


// Connect to MySQL database
con.connect(function(err) {
  if (err) throw err; // Throw error if connection fails
  console.log("Connected!"); // Log successful connection message

  // Read SQL file (init_db.sql) and execute its contents as SQL queries
  let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();
  con.query(sql, function(err, result) {
    if (err) throw err; // Throw error if SQL query execution fails
    console.log("Table creation was successful!"); // Log success message for table creation

    console.log("Closing..."); // Log closing message
  });

  con.end(); // Close MySQL connection
});
