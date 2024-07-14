import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeXJpbmFsZGkiLCJhIjoiY2x5azZyOWVrMGNoMzJqcjVpZmx6enp0cCJ9.lXQPwhWhUJw8deFEyDQeug';


function MapComponent({ photos }) {

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [12.4964, 41.9028],
      zoom: 12
    });

    photos.forEach(photo => {
      console.log(`Creating marker for ${photo.title} at [${photo.longitude}, ${photo.latitude}]`);

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${photo.url})`;
      el.style.width = '150px';
      el.style.height = '150px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '6px';
      el.style.border = '2px solid white';

      new mapboxgl.Marker(el)
        .setLngLat([photo.longitude, photo.latitude])
        .addTo(map)
        .on('error', (error) => console.error('Error in creating marker:', error)); // Catch any error in marker creation
    });

    return () => map.remove();
  }, [photos]);

  return (
    <div className="map-component">
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default MapComponent;
