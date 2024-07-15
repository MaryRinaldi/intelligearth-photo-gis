# Intelligearth Photo GIS

Welcome to Intelligearth Photo GIS, a full-stack web application that allows users to upload photos and view them on a map interface.

## Project Overview

Intelligearth Photo GIS aims to provide a platform where users can upload photos along with metadata details such as title, description, and location coordinates (latitude and longitude). These photos are then visualized on a map using Mapbox and can also be viewed in a gallery format.

## Technologies Used

### Frontend

* React with Vite: Fast development and efficient bundling.
* Mapbox: Interactive mapping and marker display.
* Vanilla CSS: Optional for styling, provides utility-first CSS.

### Backend

* Node.js with Express: Server-side framework for building RESTful APIs.
* MySQL: Database for storing photo metadata and file locations.
* Multer: Middleware for handling file uploads.

## Folder Structure

```intelligearth-photo-gis/
├── bin/
├── client/
│ ├── dist/
│ ├── node_modules/ (ignored by git)
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── views/
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ ├── main.jsx
│ ├── .env (ignored by git)
│ ├── .gitignore
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ └── vite.config.js
├── model/
│ ├── database.js
│ ├── helper.js
│ ├── init_db.sql
├── node_modules/ (ignored by git)
├── routes/
├── .env (ignored by git)
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md```

## Setup Instructions

### Backend Setup

* Navigate to the backend/ directory:
cd backend/
* Install dependencies:
npm install
* Start the backend server:
npm start

### Frontend Setup

* Navigate to the photo-upload-gis/ directory:
cd client
* Install dependencies:
npm install
* Start the frontend development server:
npm run dev

## API Documentation

* POST /api/photos/upload: Upload a photo with metadata (title, description, location).
* GET /api/photos: Fetch all uploaded photos.
* GET /api/photos/ : Fetch a single photo by ID.

## Additional Features

* User authentication
* Image processing (resizing, watermarking)
* Unit tests for key components

### Contributing

Feel free to contribute to this project by forking it and submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.
