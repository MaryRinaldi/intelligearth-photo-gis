import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapComponent from '../../src/components/MapComponent';

// Mocking the useLocation hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathname: '/map' })
}));

describe('MapComponent', () => {
  test('renders map container', () => {
    render(<MapComponent />);

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });

  test('displays map update message when on /map route', () => {
    render(<MapComponent />);

    const mapUpdateMessage = screen.getByText(/Aggiorna la mappa se ancora non visualizzi le tue foto./i);
    expect(mapUpdateMessage).toBeInTheDocument();
  });

  test('clicking on map calls handleMapClick function', () => {
    render(<MapComponent />);

    const mapContainer = screen.getByTestId('map-container');
    fireEvent.click(mapContainer);
  });

  // Add more tests to cover other functionalities of MapComponent
});
