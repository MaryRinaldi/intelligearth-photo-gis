import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapComponent from '../../src/components/MapComponent';

// Mocking the useLocation hook from react-router-dom to simulate '/map' route
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathname: '/map' })
}));

describe('MapComponent', () => {
  // Test to verify if the map container renders correctly
  test('renders map container', () => {
    render(<MapComponent />);

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });

  // Test to verify if the map update message displays correctly on '/map' route
  test('displays map update message when on /map route', () => {
    render(<MapComponent />);

    const mapUpdateMessage = screen.getByText(/Aggiorna la mappa se ancora non visualizzi le tue foto./i);
    expect(mapUpdateMessage).toBeInTheDocument();
  });

  // Test to simulate clicking on the map and verify if handleMapClick function is called
  test('clicking on map calls handleMapClick function', () => {
    render(<MapComponent />);

    const mapContainer = screen.getByTestId('map-container');
    fireEvent.click(mapContainer);

    // Ideally, add assertions to verify the behavior of handleMapClick
  });

  // Add more tests to cover other functionalities of MapComponent
});
