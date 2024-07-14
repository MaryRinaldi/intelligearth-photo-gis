import React from 'react';

const photos = [
"https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tYXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvbWF8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1581274050302-581149d3b4c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJvbWF8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1603199766980-fdd4ac568a11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJvbWF8ZW58MHx8MHx8fDA%3D",
];

const PhotoGrid = ({ photos }) => (
  <div className="photo-grid">
    {photos.map((photo, index) => (
      <div key={index} className="photo-item">
        <img src={photo} alt={`Photo ${index}`} />
      </div>
    ))}
  </div>
);

export default PhotoGrid;
