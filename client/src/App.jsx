import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFyeXJpbmFsZGkiLCJhIjoiY2x5azZyOWVrMGNoMzJqcjVpZmx6enp0cCJ9.lXQPwhWhUJw8deFEyDQeug';

function App() {

  useEffect(() => {
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [12.4964, 41.9028], 
  zoom: 12 
  });
  return () => map.remove();
}, []);

  return (
    <>
    <div>
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>

    </>
  );
}

export default App;
