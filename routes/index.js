var express = require('express');
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();

const { uploadPhoto, getAllPhotos, getPhotoById } = require('../controllers/photoControllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( { title: 'Express' });
});

// Endpoint per l'upload di una foto
router.post('/api/upload', uploadPhoto);

// Endpoint per ottenere tutte le foto
router.get('/api/photos', getAllPhotos);

// Endpoint per ottenere una singola foto per ID
router.get('/api/photos/:id', getPhotoById);

module.exports = router;
