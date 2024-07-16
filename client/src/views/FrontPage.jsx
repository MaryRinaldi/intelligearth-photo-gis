import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import PhotoUploadForm from '../components/PhotoUploadForm';
import UploadedImagePreview from './UploadedImagePreview';
import '../App.css'

function FrontPage ({photos, mockPhotos}) {

const [uploadedPhotos, setUploadedPhotos] = useState([]);
const [uploadedImageUrl, setUploadedImageUrl] = useState('');

const handlePhotoUpload = (url) => {
setUploadedImageUrl(url);
};

  // const handlePhotoUpload = async (url) => {
  //   const newPhoto = {
  //     title: 'Uploaded Photo',
  //     description: 'This is an uploaded photo',
  //     latitude: 0, 
  //     longitude: 0, 
  //     url: url,
  //   };
  //   const response = await fetch('http://localhost:5000/api/photos', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newPhoto),
  //   });
  
  //   if (response.ok) {
  //     const uploadedPhoto = await response.json();
  //     setUploadedPhotos([...uploadedPhotos, uploadedPhoto]);
  //   }
  // };

  return (
    <>
    <PhotoUploadForm onPhotoUpload={handlePhotoUpload} setUploadedImageUrl={setUploadedImageUrl} />
    <div className="Frontpage">
      <div className='introduction'>
      <p>
Hai mai scattato una foto incredibile e poi hai trascorso ore a cercare di ricordare dove l'hai fatta?
<br></br>
Bene, è arrivato il momento di porre fine alla confusione! <br></br> Con la mia app, puoi caricare le tue foto, aggiungere titoli e descrizioni memorabili, e salvare con precisione la latitudine e la longitudine per non dimenticare mai il luogo esatto del tuo momento speciale.
<br></br>
Clicca sulla mappa per impostare le tue foto alla posizione (longitude, latitude) che preferisci. Ti basterà caricare la foto dopo aver cliccato sulla mappa!
<br></br>
Altrimenti, usa il geolocalizzatore per salvare la foto alla tua posizione!
<br></br>
Desideri visualizzare tutte le tue foto in un colpo d'occhio? Basta un clic su "Gallery" e avrai accesso a una galleria completa dei tuoi ricordi.
<br></br>
Stai cercando quella foto specifica del barbecue del 2010? Inserisci l'ID univoco nella barra di ricerca situata nella galleria e la troverai in un attimo.
<br></br>
Esplora la sezione "Profile" per scoprire i luoghi che hai visitato e dove hai localizzato le tue foto.
<br></br>
E se preferisci inserire un URL anziché caricare direttamente l'immagine, l'app gestisce tutto senza problemi; perché, diciamocelo, il Wi-Fi può essere complicato a volte.
<br></br>
Grazie per aver scelto la mia app!
<br></br>
Spero che ti aiuti a rivivere i tuoi momenti speciali e a non perdere mai più un ricordo. <br></br>Dopotutto, la memoria è un po' come una vecchia scatola di biscotti: piena di sorprese!
</p>
      </div>
      <MapComponent photos={mockPhotos} />
      <div className="photo-grid">
      {[...uploadedPhotos, ...mockPhotos].map((photo) => (
        <div key={photo.id} className="photo-item">
          <img src={photo.url} alt={photo.title} />
          <div className="photo-details">
            <h3>{photo.title}</h3>
            <p>{photo.description}</p>
            <p>Location: {photo.latitude}, {photo.longitude}</p>
          </div>
        </div>
      ))}
    </div>
      <div>
      {uploadedImageUrl && <UploadedImagePreview imageUrl={uploadedImageUrl} />}
    </div>
    </div>
    </>
  );
}

export default FrontPage;