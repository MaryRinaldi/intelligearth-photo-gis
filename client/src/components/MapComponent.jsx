import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import PhotoUploadForm from './PhotoUploadForm'; 

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeXJpbmFsZGkiLCJhIjoiY2x5azZyOWVrMGNoMzJqcjVpZmx6enp0cCJ9.lXQPwhWhUJw8deFEyDQeug';

const mockPhotos = [
  {
    id: 1,
    title: 'Photo 1',
    description: 'Description 1',
    latitude: 41.9028,
    longitude: 12.4964,
    url: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tYXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 2,
    title: 'Photo 2',
    description: 'Description 2',
    latitude: 40.9038,
    longitude: 12.4965,
    url: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvbWF8ZW58MHx8MHx8fDA%3D'
  },
];

function MapComponent() {
  const [photos, setPhotos] = useState(mockPhotos);

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

  useEffect(() => {
    fetch('/api/photos')
    .then(response => response.json())
    .then(data => setPhotos(data))
    .catch(error => console.error('Error in fetching photos:', error))
  }, [])

  return (
    <>
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </>
  );
}

export default MapComponent;
