var express = require('express'); 
var router = express.Router();
var db = require("../model/helper"); 
require("dotenv").config();
const { decodeBase64Image } = require('./utils'); 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const app = require("../app")

// variables needed for bcrypt to do the encryption
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

let processingRequest = false; // Flag to prevent concurrent processing of requests

/* POST request for saving data */
router.post('/photos', async (req, res) => {
  if (processingRequest) {
    return res.status(400).json({ error: "Duplicate request" }); // Return error if request is already being processed
  }

  const { title, description, latitude, longitude, url, files } = req.body;

  // Validate required fields
  if (!title || !description || !latitude || !longitude || (!url && (!files || files.length === 0))) {
    console.log('Missing required fields:', { title, description, latitude, longitude, url });
    return res.status(400).json({ error: "Missing fields." });
  }

  const lat = Number(latitude);
  const lng = Number(longitude);

  // Validate latitude and longitude
  if (isNaN(lat) || isNaN(lng)) {
    console.log('Invalid latitude or longitude:', { latitude, longitude });
    return res.status(400).json({ error: "Latitude and longitude must be numbers." });
  }

  try {
    processingRequest = true; // Set processing flag to true

    let uploadedUrl = url;

    if (files && files.length > 0) {
      // Handle base64 encoded images
      const fileInsertPromises = files.map(async (file) => {
        const decodedImage = decodeBase64Image(file);
        const query = 'INSERT INTO pic_table (title, description, latitude, longitude, file) VALUES (?, ?, ?, ?, ?)';
        const values = [title, description, lat, lng, decodedImage.data];
        const result = await db.executeQuery(query, values);
        return result.insertId;
      });

      const insertResults = await Promise.all(fileInsertPromises);
      const lastInsertId = insertResults[insertResults.length - 1];

      if (lastInsertId) {
        const getUrlQuery = 'SELECT url FROM pic_table WHERE id = ?';
        const urlResult = await db.executeQuery(getUrlQuery, [lastInsertId]);
        uploadedUrl = urlResult[0].url;
      } else {
        console.error('Failed to insert image data into database');
        return res.status(500).json({ error: "Failed to insert image data into database" });
      }
    } else {
      // Handle regular URL upload
      const query = 'INSERT INTO pic_table (title, description, latitude, longitude, url) VALUES (?, ?, ?, ?, ?)';
      const values = [title, description, lat, lng, url];
      const result = await db.executeQuery(query, values);
      uploadedUrl = url;
    }

    res.json({ url: uploadedUrl }); // Respond with uploaded URL
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).json({ error: "Error inserting data into the database" });
  } finally {
    processingRequest = false; // Reset processing flag to false after request processing
  }
});

/* GET all photos from database */
router.get('/photos', function(req, res, next) {
  const query = 'SELECT * FROM pic_table';
  db.executeQuery(query)
    .then(result => res.json(result))
    .catch(error => {
      console.error('Error fetching data from the database:', error);
      res.status(500).json({ error: "Error fetching data from the database" });
    });
});

/* GET single photo by ID */
router.get('/photos/:id', function(req, res, next) {
  const { id } = req.params;
  const query = 'SELECT * FROM pic_table WHERE id = ?';
  db.executeQuery(query, [id])
    .then(result => {
      if (result.length === 0) {
        res.status(404).json({ error: `Photo with ID ${id} not found` });
      } else {
        res.json(result[0]);
      }
    })
    .catch(error => {
      console.error('Error fetching single photo from the database:', error);
      res.status(500).json({ error: "Error fetching single photo from the database" });
    });
});

router.post("/register", async (req, res) => {
  let { userName, userEmail, userPassword } = req.body;
  try {
    let encryptedPWD = await bcrypt.hash(userPassword, saltRounds);
    //create new user on DB to store user credentials
    await db(
      `INSERT into users (userName, userEmail, userPassword) VALUES ("${userName}", "${userEmail}", "${encryptedPWD}");`
    );
    res.send({ message: "User created correctly" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { userName, userPassword } = req.body;
  try {
    const response = await db(
      `SELECT * FROM users WHERE userName = "${userName}"`
    );
    const user = response.data[0];
    if (user) {
      const doMatch = await bcrypt.compare(userPassword, user.userPassword);
      if (!doMatch) {
        return res.status(401).send({ error: "Password doesn't match" });
      }
      const token = jwt.sign({ userId: user.id }, supersecret);
      return res.send({ token, userId: user.id });
    } else {
      return res.status(401).send({ error: "User not found" });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/private", async (req, res) => {
  // check "authorization" header, it has the format: "Bearer <token>"
  // and split the string to get only the <token> part
  let authHeader = req.headers["authorization"];
  // Separate 'Bearer' and token
  let [str, token] = authHeader.split(" ");
  try {
    //verify token and extract payload that includes user id (⇒ `jwt.verify()`)
    let payload = jwt.verify(token, supersecret);
    let result = await db(`SELECT * FROM users WHERE id = ${payload.userId}`);
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/register", async (req, res) => {
  let { userName, userEmail, userPassword } = req.body;
  try {
    let encryptedPWD = await bcrypt.hash(userPassword, saltRounds);
    //create new user on DB to store user credentials
    await db(
      `INSERT into users (userName, userEmail, userPassword) VALUES ("${userName}", "${userEmail}", "${encryptedPWD}");`
    );
    res.send({ message: "User created correctly" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { userName, userPassword } = req.body;
  try {
    const response = await db(
      `SELECT * FROM users WHERE userName = "${userName}"`
    );
    const user = response.data[0];
    if (user) {
      const doMatch = await bcrypt.compare(userPassword, user.userPassword);
      if (!doMatch) {
        return res.status(401).send({ error: "Password doesn't match" });
      }
      const token = jwt.sign({ userId: user.id }, supersecret);
      return res.send({ token, userId: user.id });
    } else {
      return res.status(401).send({ error: "User not found" });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/private", async (req, res) => {
  // check "authorization" header, it has the format: "Bearer <token>"
  // and split the string to get only the <token> part
  let authHeader = req.headers["authorization"];
  // Separate 'Bearer' and token
  let [str, token] = authHeader.split(" ");
  try {
    //verify token and extract payload that includes user id (⇒ `jwt.verify()`)
    let payload = jwt.verify(token, supersecret);
    let result = await db(`SELECT * FROM users WHERE id = ${payload.userId}`);
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router; // Exporting the router with defined endpoints
