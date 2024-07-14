// controllers/photoController.js

const Photo = require('../model/database'); // Assumi che ci sia un modello Photo che rappresenta la tabella delle foto nel database

// Middleware per l'upload di una foto
const uploadPhoto = async (req, res, next) => {
  try {
    const { title, description, latitude, longitude } = req.body;
    const photoUrl = req.file.path; // Assumi che il file sia stato caricato usando multer o un altro middleware simile

    // Salva i dati nel database
    const newPhoto = await Photo.create({
      title,
      description,
      latitude,
      longitude,
      url: photoUrl
    });

    res.status(201).json({ photoUrl: newPhoto.url }); // Ritorna l'URL della foto appena caricata
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
};

// Middleware per ottenere tutte le foto
const getAllPhotos = async (req, res, next) => {
  try {
    const photos = await Photo.findAll();
    res.status(200).json(photos);
  } catch (error) {
    console.error('Error retrieving photos:', error);
    res.status(500).json({ error: 'Failed to retrieve photos' });
  }
};

// Middleware per ottenere una singola foto per ID
const getPhotoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const photo = await Photo.findByPk(id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.status(200).json(photo);
  } catch (error) {
    console.error('Error retrieving photo by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve photo' });
  }
};

module.exports = {
  uploadPhoto,
  getAllPhotos,
  getPhotoById
};
