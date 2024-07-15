var express = require('express');
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();

let processingRequest = false;

/* POST request for saving data */
router.post('/photos', async (req, res) => {
  if (processingRequest) {
    return res.status(400).json({ error: "Duplicate request" });
  }

  const { title, description, latitude, longitude, url } = req.body;

  if (!title || !description || !latitude || !longitude || !url) {
    console.log('Missing required fields:', { title, description, latitude, longitude, url });
    return res.status(400).json({ error: "Missing fields." });
  }

  const lat = Number(latitude);
  const lng = Number(longitude);

  if (isNaN(lat) || isNaN(lng)) {
    console.log('Invalid latitude or longitude:', { latitude, longitude });
    return res.status(400).json({ error: "Latitude and longitude must be numbers." });
  }

  const query = 'INSERT INTO pic_table (title, description, latitude, longitude, url) VALUES (?, ?, ?, ?, ?)';
  const values = [title, description, lat, lng, url];
  
  processingRequest = true;
  try {
    const result = await db.executeQuery(query, values);
    res.json({ values, id: result.insertId });
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).json({ error: "Error inserting data into the database" });
  } finally {
    processingRequest = false;
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

module.exports = router;
