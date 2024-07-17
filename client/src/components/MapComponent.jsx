import React, { useEffect, useRef, useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import mapboxgl from 'mapbox-gl'; // Importing Mapbox GL library

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeXJpbmFsZGkiLCJhIjoiY2x5azZyOWVrMGNoMzJqcjVpZmx6enp0cCJ9.lXQPwhWhUJw8deFEyDQeug'; // Setting Mapbox access token

function MapComponent({ photos, lastUploadedUrl, setLastUploadedUrl }) {
  const mapContainerRef = useRef(null); // Ref for map container element
  const mapRef = useRef(null); // Ref for map instance
  const location = useLocation(); // Location object from react-router-dom
  const [mapKey, setMapKey] = useState(0); // State to force map re-render

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [12.4964, 41.9028],
        zoom: 11.5
      });
      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right'); // Adding navigation control
    }

    // Cleanup function to remove map instance on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Effect to add markers when photos or map load
  useEffect(() => {
    if (!mapRef.current || !photos) return;

    // Event listener for map load
    mapRef.current.on('load', () => {
      addMarkersToMap();
    });

    // Event listener for map click
    mapRef.current.on('click', handleMapClick);

    // Initial markers addition
    addMarkersToMap();

    // Cleanup function to remove click event listener
    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick);
      }
    };
  }, [photos]); // Dependency array ensures this effect runs when photos change

  // Handle click on the map to add a marker
  const handleMapClick = (e) => {
    const { lng, lat } = e.lngLat;

    // Logging coordinates and last uploaded URL
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    console.log('Last URL:', lastUploadedUrl);

    // Creating marker element
    const markerEl = document.createElement('div');
    markerEl.className = 'marker';
    markerEl.style.backgroundImage = `url(${lastUploadedUrl || 'https://media.istockphoto.com/id/1397597374/it/foto/roma-al-q33VgYjFvp8I4EOmu592oR7YnrFdPrXPlOhCZ5FqJ4k='})`;
    markerEl.style.width = '150px';
    markerEl.style.height = '150px';
    markerEl.style.backgroundSize = 'cover';
    markerEl.style.borderRadius = '6px';

    // Adding marker to the map
    new mapboxgl.Marker(markerEl)
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    // Data for the photo to be sent to the server
    const photoData = {
      title: 'Photo Title',
      description: 'Photo Description',
      latitude: lat,
      longitude: lng,
      url: lastUploadedUrl || 'https://media.istockphoto.com/id/1717026172/it/foto/piazza-navona-a-roma-italia.webp?b=1&s=170667a&w=0&k=20&c=IOnKYiQB9Pnz2h2pCPoRCzZCGFHb9_WKTGPUru_TEus='
    };

    // Logging photo data before sending to server
    console.log('Photo data to be sent to the server:', photoData);

    // Fetch request to POST photo data to the server
    fetch('/api/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(photoData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setMapKey(prevKey => prevKey + 1); // Force map re-render to show new markers
      })
      .catch((error) => console.error('Error:', error));

    // Centering map on clicked coordinates
    if (mapRef.current) {
      mapRef.current.setCenter([lng, lat]);
    }
  };

  // Function to add markers for existing photos
  const addMarkersToMap = () => {
    if (!mapRef.current || !photos) return;

    photos.forEach(photo => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${photo.url})`;
      el.style.width = '150px';
      el.style.height = '150px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '6px';
      el.style.border = '2px solid white';

      const image = new Image();
      image.src = photo.url;
      image.onload = () => {
        new mapboxgl.Marker(el)
          .setLngLat([photo.longitude, photo.latitude])
          .addTo(mapRef.current);
      };
      image.onerror = (error) => {
        console.error('Error loading image:', error);
        el.remove();
      };

      // Update last uploaded URL after adding the last marker
      if (photo === photos[photos.length - 1]) {
        setLastUploadedUrl(photo.url);
      }
    });
  };

  // JSX rendering for the MapComponent
  return (
    <div className="map-component">
      {location.pathname === '/map' && (
        <p>Aggiorna la mappa se ancora non visualizzi le tue foto.</p>
      )}
      <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default MapComponent;
