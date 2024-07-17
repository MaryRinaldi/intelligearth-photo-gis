const request = require('supertest'); // Importing Supertest for HTTP assertions
const express = require('express'); // Importing Express framework
const bodyParser = require('body-parser'); // Importing body-parser middleware
const router = require('./router'); // Importing the router module to be tested
const db = require('../model/helper'); // Importing database helper functions

// Mocking utils to simulate image decoding
jest.mock('./utils', () => ({
  decodeBase64Image: jest.fn().mockReturnValue({ data: 'mockedImageData' })
}));

// Mocking db helper to simulate database queries
jest.mock('../model/helper', () => ({
  executeQuery: jest.fn(),
}));

// Setting up Express app and using the router under test
const app = express();
app.use(bodyParser.json());
app.use('/', router);

// Test cases for Photo API endpoints
describe('Photo API Endpoints', () => {

  // Reset mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test suite for POST /photos endpoint
  describe('POST /photos', () => {

    // Test case: Successful photo upload
    it('should respond with uploaded URL on successful photo upload', async () => {
      const mockInsertId = 1;
      const mockUrl = 'https://example.com/photo1.jpg';
      db.executeQuery.mockResolvedValueOnce([{ url: mockUrl }]);
      
      const requestBody = {
        title: 'Test Photo',
        description: 'Test Description',
        latitude: 41.9028,
        longitude: 12.4964,
        url: 'https://example.com/testphoto.jpg'
      };

      const response = await request(app)
        .post('/photos')
        .send(requestBody)
        .expect(200);

      expect(response.body).toHaveProperty('url', mockUrl);
      expect(db.executeQuery).toHaveBeenCalledTimes(1);
    });

    // Test case: Handling missing fields
    it('should handle missing fields and return 400', async () => {
      const requestBody = {
        description: 'Test Description',
        latitude: 41.9028,
        longitude: 12.4964
      };

      const response = await request(app)
        .post('/photos')
        .send(requestBody)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Missing fields.');
      expect(db.executeQuery).not.toHaveBeenCalled();
    });

    // Add more tests for edge cases like duplicate requests, invalid coordinates, etc.
  });

  // Test suite for GET /photos endpoint
  describe('GET /photos', () => {

    // Test case: Fetching all photos from the database
    it('should respond with all photos from the database', async () => {
      const mockPhotos = [
        { id: 1, title: 'Photo 1', url: 'https://example.com/photo1.jpg' },
        { id: 2, title: 'Photo 2', url: 'https://example.com/photo2.jpg' }
      ];
      db.executeQuery.mockResolvedValueOnce(mockPhotos);

      const response = await request(app)
        .get('/photos')
        .expect(200);

      expect(response.body).toEqual(mockPhotos);
      expect(db.executeQuery).toHaveBeenCalledTimes(1);
    });

    // Add more tests to cover error scenarios, empty database response, etc.
  });

  // Test suite for GET /photos/:id endpoint
  describe('GET /photos/:id', () => {

    // Test case: Fetching a photo by ID
    it('should respond with the photo corresponding to the provided ID', async () => {
      const mockPhoto = { id: 1, title: 'Photo 1', url: 'https://example.com/photo1.jpg' };
      db.executeQuery.mockResolvedValueOnce([mockPhoto]);

      const response = await request(app)
        .get('/photos/1')
        .expect(200);

      expect(response.body).toEqual(mockPhoto);
      expect(db.executeQuery).toHaveBeenCalledTimes(1);
    });

    // Test case: Handling scenario where photo with ID does not exist
    it('should respond with 404 if photo with provided ID does not exist', async () => {
      db.executeQuery.mockResolvedValueOnce([]);

      await request(app)
        .get('/photos/999')
        .expect(404);
      
      expect(db.executeQuery).toHaveBeenCalledTimes(1);
    });

    // Add more tests for edge cases like non-numeric ID, error handling, etc.
  });
});
