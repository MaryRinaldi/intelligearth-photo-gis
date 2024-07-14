var express = require('express');
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();
const cors = require('cors');
var app = express();
app.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( { title: 'Express' });
});

/* POST request for saving data */
router.post('/photo_gis', function(req, res, next) {
  const { title, description, latitude, longitude } = req.body;
  if (!title || !description || !latitude || !longitude) {
    return res.status(400).json({ error: "Values must be completed." });
  }
  if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
    return res.status(400).json({ error: "Latitude e longitude must be numbers." });
}
db.beginTransaction()
.then(() => {
  const query = 'INSERT INTO pic_table (title, description, latitude, longitude) VALUES (?, ?, ?, ?)';
  const values = [title, description, latitude, longitude];
  return db(query, values);
})
    .then(result => {
      db.commit();
      res.json(result);
})
    .catch(error => {
      db.rollback();
      console.error(error);
      res.status(500).json({ error: "Error inserting data into the database" });
    });
});

/* GET all photos from database */
router.get('/photos_gis', function(req, res, next) {
  const query = 'SELECT * FROM pic_table';
  db(query)
    .then(result => res.json(result))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Error fetching from the database" });
    });
});

/* GET single photo by ID */
router.get('/photos/:id', function(req, res, next) {
  const { id } = req.params.id;
  const query = 'SELECT * FROM pic_table WHERE id = ?';
  db(query, [id])
    .then(result => {
      if (result.data.length === 0) {
        res.status(404).json({ error: `Photo with ID ${id} not found` });
      } else {
        res.json(result.data[0]);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Error fetching photo from the database" });
    });
});

module.exports = router;
