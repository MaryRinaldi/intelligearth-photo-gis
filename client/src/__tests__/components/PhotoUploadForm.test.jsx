import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PhotoUploadForm from '../components/PhotoUploadForm';

describe('PhotoUploadForm', () => {
  it('renders without crashing', () => {
    render(<PhotoUploadForm />);
  });

  it('updates state when input values change', () => {
    const { getByLabelText } = render(<PhotoUploadForm />);
    
    fireEvent.change(getByLabelText('Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Description:'), { target: { value: 'Test Description' } });
    fireEvent.change(getByLabelText('Latitude:'), { target: { value: '12.34' } });
    fireEvent.change(getByLabelText('Longitude:'), { target: { value: '56.78' } });
    fireEvent.change(getByLabelText('Insert your URL here:'), { target: { value: 'https://example.com/image.jpg' } });
    
    expect(getByLabelText('Title:')).toHaveValue('Test Title');
    expect(getByLabelText('Description:')).toHaveValue('Test Description');
    expect(getByLabelText('Latitude:')).toHaveValue('12.34');
    expect(getByLabelText('Longitude:')).toHaveValue('56.78');
    expect(getByLabelText('Insert your URL here:')).toHaveValue('https://example.com/image.jpg');
  });

  it('submits form data and resets state on successful submission', async () => {
    // Mock fetch function and response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ url: 'https://example.com/uploaded_image.jpg' }),
    });

    const onPhotoUpload = jest.fn();
    const setUploadedImageUrl = jest.fn();

    const { getByLabelText, getByText } = render(
      <PhotoUploadForm onPhotoUpload={onPhotoUpload} setUploadedImageUrl={setUploadedImageUrl} />
    );

    // Fill form inputs
    fireEvent.change(getByLabelText('Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Description:'), { target: { value: 'Test Description' } });
    fireEvent.change(getByLabelText('Latitude:'), { target: { value: '12.34' } });
    fireEvent.change(getByLabelText('Longitude:'), { target: { value: '56.78' } });
    fireEvent.change(getByLabelText('Insert your URL here:'), { target: { value: 'https://example.com/image.jpg' } });

    // Submit the form
    fireEvent.click(getByText('Upload'));

    // Wait for form submission to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Title',
          description: 'Test Description',
          latitude: 12.34,
          longitude: 56.78,
          url: 'https://example.com/image.jpg',
          files: null,
        }),
      });

      expect(setUploadedImageUrl).toHaveBeenCalledWith('https://example.com/uploaded_image.jpg');
      expect(onPhotoUpload).toHaveBeenCalledWith('https://example.com/uploaded_image.jpg');

      // Check that form fields are reset after successful submission
      expect(getByLabelText('Title:')).toHaveValue('');
      expect(getByLabelText('Description:')).toHaveValue('');
      expect(getByLabelText('Latitude:')).toHaveValue('');
      expect(getByLabelText('Longitude:')).toHaveValue('');
      expect(getByLabelText('Insert your URL here:')).toHaveValue('');
    });
  });
});
