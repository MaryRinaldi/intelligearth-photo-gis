import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import PhotoGrid from './PhotoGrid';

describe('PhotoGrid Component', () => {
  beforeEach(() => {
    // Mock of fetch API
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve([
        {
          id: 1,
          title: 'Photo 1',
          description: 'Description 1',
          latitude: 41.9028,
          longitude: 12.4964,
          url: 'https://example.com/photo1.jpg'
        },
        {
          id: 2,
          title: 'Photo 2',
          description: 'Description 2',
          latitude: 41.9028,
          longitude: 12.4964,
          url: 'https://example.com/photo2.jpg'
        }
      ])
    });
  });

  afterEach(() => {

    jest.restoreAllMocks();
  });

  it('renders PhotoGrid component correctly', async () => {
    render(<PhotoGrid />);

    expect(screen.getByText(/Visualizza qui le tue foto caricate/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Photo 1')).toBeInTheDocument();
      expect(screen.getByText('Photo 2')).toBeInTheDocument();
    });
  });

  it('handles photo click correctly', async () => {
    render(<PhotoGrid />);

    await waitFor(() => {
      expect(screen.getByText('Photo 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByAltText('Photo 1'));

    expect(screen.getByText('Photo 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Location: 41.9028, 12.4964')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 1')).toBeInTheDocument();
  });

  it('handles search functionality correctly', async () => {
    render(<PhotoGrid />);

    await waitFor(() => {
      expect(screen.getByText('Photo 1')).toBeInTheDocument();
      expect(screen.getByText('Photo 2')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search by title...'), { target: { value: 'Photo 1' } });

    expect(screen.getByText('Photo 1')).toBeInTheDocument();
    expect(screen.queryByText('Photo 2')).not.toBeInTheDocument();
  });
});
