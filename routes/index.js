var express = require('express');
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();

const multer = require('multer');
const cors = require('cors');
var app = express();
app.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

/* Multer setup for file upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to store uploaded files
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // Specify a unique file name to be saved
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage }).single('photo'); // 'photo' should match the name attribute in the FormData

/* POST request for saving data */
router.post('/photos', function(req, res, next) {
  // Use multer middleware to parse file upload
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      console.error('Multer error:', err);
      return res.status(500).json({ error: 'File upload failed' });
    } else if (err) {
      // An unknown error occurred
      console.error('Unknown error during file upload:', err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    // If multer successfully parsed the file upload, continue processing
    const { title, description, latitude, longitude, url } = req.body;
    const photoUrl = req.file ? req.file.path : null; // File path where multer saved the uploaded file
    if (!title || !description || !latitude || !longitude) {
      // Check if required fields are missing
      return res.status(400).json({ error: "Title, description, latitude, and longitude are required fields." });
    }
    if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
      // Check if latitude and longitude are valid numbers
      return res.status(400).json({ error: "Latitude and longitude must be numbers." });
    }

    // Insert data into database
    let query, values;
    if (url) {
      query = 'INSERT INTO pic_table (title, description, latitude, longitude, url) VALUES (?, ?, ?, ?, ?)';
      values = [title, description, latitude, longitude, url];
    } else {
      query = 'INSERT INTO pic_table (title, description, latitude, longitude) VALUES (?, ?, ?, ?)';
      values = [title, description, latitude, longitude];
    }

    db.executeQuery(query, values)
      .then(result => {
        if (photoUrl) {
          res.json({ message: 'Photo uploaded successfully', photo: { url: photoUrl } });
        } else {
          res.json({ message: 'Photo data saved successfully' });
        }
      })
      .catch(error => {
        console.error('Error inserting data into the database:', error);
        res.status(500).json({ error: "Error inserting data into the database" });
      });
  });
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

module.exports = router;
