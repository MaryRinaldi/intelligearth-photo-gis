# Intelligearth Photo GIS

Welcome to Intelligearth Photo GIS, a full-stack web application that allows users to upload photos and view them on a map interface.

## Project Overview

Intelligearth Photo GIS aims to provide a platform where users can upload photos along with metadata details such as title, description, and location coordinates (latitude and longitude). These photos are then visualized on a map using Mapbox and can also be viewed in a gallery format.

## Technologies Used

### Frontend

* React with Vite: Fast development and efficient bundling.
* Mapbox: Interactive mapping and marker display.
* Vanilla CSS: Optional for styling, provides utility-first CSS.

I chose to use Mapbox for mapping due to its extensive features and customization options, which enhance the user experience.

### Backend

* Node.js with Express: Server-side framework for building RESTful APIs.
* MySQL: Database for storing photo metadata and file locations.
* Multer: Middleware for handling file uploads.

### API Documentation

* Upload a Photo
Endpoint:

```POST /api/photos/upload```

Uploads a photo along with metadata (title, description, location coordinates).

Request Body:

```
{
  "title": "Photo Title",
  "description": "Photo Description",
  "latitude": 41.9028,
  "longitude": 12.4964,
  "file": "Base64 encoded image data"
}
```

Response:

```
{
  "id": 1,
  "title": "Photo Title",
  "description": "Photo Description",
  "latitude": 41.9028,
  "longitude": 12.4964,
  "url": "https://example.com/photos/1"
}
```

* Get All Photos
Endpoint:

```GET /api/photos```

Retrieves a list of all uploaded photos.

Response:

```
[
  {
    "id": 1,
    "title": "Photo Title",
    "description": "Photo Description",
    "latitude": 41.9028,
    "longitude": 12.4964,
    "url": "https://example.com/photos/1"
  },
  {
    "id": 2,
    "title": "Another Photo",
    "description": "Another Description",
    "latitude": 40.7128,
    "longitude": -74.006,
    "url": "https://example.com/photos/2"
  }
]
```

* Get Photo by ID
Endpoint:

```GET /api/photos/:id```

Retrieves a single photo by its ID parameter.

Response:

```
{
  "id": 1,
  "title": "Photo Title",
  "description": "Photo Description",
  "latitude": 41.9028,
  "longitude": 12.4964,
  "url": "https://example.com/photos/1"
}
```

I assume that users will provide valid latitude and longitude coordinates when uploading photos.

## Folder Structure

```
intelligearth-photo-gis/
|
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
└── README.md
```

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
Thank you *
