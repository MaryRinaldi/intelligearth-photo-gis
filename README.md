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

* Get All Photos.
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

* Get Photo by ID.
Endpoint:

```GET /api/photos/:id```

* Retrieves a single photo by its ID parameter.

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
│ │ ├── Media-related.css
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

## API Report

* POST /api/photos: Upload a photo with metadata (title, description, location).
* GET /api/photos: Fetch all uploaded photos.
* GET /api/photos/ : Fetch a single photo by ID.

### Additional Future Features

* User authentication
* Image processing (resizing, watermarking)
* Unit tests for key components to work properly

### Contributing

Feel free to contribute to this project by forking it and submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.
Thank you ***

## Deploying React Vite Applications on Render.com

1. Setup Your Repository:
  After creating your React applications using Vite, ensure you have a repository on GitHub or GitLab where the code for your applications resides.
2. Access Render.com Dashboard:
  Access your dashboard on Render.com and click on "New", then select "Static Site".
3. Connect Your Repository:
    Choose the Git provider that hosts the repository of your React Vite applications, or enter the link to a public repository. In our case, we connected our Static Site to the NoteKeeper repository.
4. Configure Project Details:
  Specify the project name, the repository branch, and other necessary information.
5. Build Commands:
  In the "Build Commands" section, enter the following commands:
    npm install; npm run build
6. Publish Directory:
    In the "Publish Directory" section, specify the folder containing the static assets of the built applications. For React Vite applications, set the Root Directory to dist.
7. Customize Settings:
    Customize additional settings as needed (environment variables, Auto-Deploy, etc.).
8. Initiate Deployment:
    Once satisfied with the configuration, click on "Create Static Site" to initiate the deployment process.
9. Automatic Deployment:
    Render.com will automatically handle the build and deployment of your React Vite applications, based on the specified commands and directory.
10. Access Your Live Sites:
    Upon successful deployment, your sites will be live, and Render.com will provide unique URLs to access them.
11. View Your Applications:
    View your live React Vite applications by navigating to the generated URLs in your web browsers.

These instructions streamline the process of deploying React Vite applications on Render.com, facilitating a smooth transition from development to production. Happy deploying!
