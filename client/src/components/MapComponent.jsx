import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeXJpbmFsZGkiLCJhIjoiY2x5azZyOWVrMGNoMzJqcjVpZmx6enp0cCJ9.lXQPwhWhUJw8deFEyDQeug';

function MapComponent({ photos }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [12.4964, 41.9028],
        zoom: 12
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !photos) return;

    mapRef.current.on('load', () => {
      addMarkersToMap();
    });

    mapRef.current.on('click', handleMapClick);

    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick);
      }
    };
  }, [photos]);

  const handleMapClick = (e) => {
    const { lng, lat } = e.lngLat;

    // Log latitude and longitude to the console
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);

    // Create a new marker element
    const markerEl = document.createElement('div');
    markerEl.className = 'marker';
    markerEl.style.backgroundImage = 'url(https://media.istockphoto.com/id/1397597374/it/foto/roma-al-tramonto.webp?b=1&s=170667a&w=0&k=20&c=jy49eiUjC0g_Px-4w96xz-R_0Hh5-841EAR1_LkUnL0=)';
    markerEl.style.width = '150px';
    markerEl.style.height = '150px';
    markerEl.style.backgroundSize = 'cover';
    markerEl.style.borderRadius = '6px';

    new mapboxgl.Marker(markerEl)
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    // Prepare data to be sent to the server
    const photoData = {
      title: 'Photo Title',
      description: 'Photo Description',
      latitude: lat,
      longitude: lng,
      url: 'https://media.istockphoto.com/id/1397597374/it/foto/roma-al-tramonto.webp?b=1&s=170667a&w=0&k=20&c=jy49eiUjC0g_Px-4w96xz-R_0Hh5-841EAR1_LkUnL0='
    };

    // Log the data
    console.log('Photo data to be sent to the server:', photoData);

    // Send data to the server (uncomment this part when your server is ready)
    // fetch('/api/save-pic', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(photoData)
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
  };

  const addMarkersToMap = () => {
    if (!mapRef.current || !photos) return;

    // Clear existing markers
    document.querySelectorAll('.marker').forEach(marker => marker.remove());

    // Add new markers
    photos.forEach(photo => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${photo.url})`;
      el.style.width = '150px';
      el.style.height = '150px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '6px';
      el.style.border = '2px solid white';

      // Check if the image loads correctly
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
    });
  };

  return (
    <div className="map-component">
      <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default MapComponent;
