import React from 'react';

const UploadedImagePreview = ({ imageUrl }) => {
  return (
    <div className="uploaded-image-container">
      <h3>Uploaded Image Preview:</h3>
      <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
    </div>
  );
};

export default UploadedImagePreview;