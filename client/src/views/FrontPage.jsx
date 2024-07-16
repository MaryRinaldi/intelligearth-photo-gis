import React, { useState } from 'react';
import Header from "./Header";
import MapComponent from '../components/MapComponent';
import PhotoGrid from './PhotoGrid';
import PhotoUploadForm from '../components/PhotoUploadForm';
import UploadedImagePreview from './UploadedImagePreview';
import '../App.css'

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
    url: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvbWF8ZW58MHx8MHx8fDA%3D%3D'
  },
];

function FrontPage () {

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
    <div className="App">
      <Header onPhotoUpload={handlePhotoUpload} />
      <div className='introduction'>
      <p>
Hai mai scattato una foto incredibile e poi hai trascorso ore a cercare di ricordare dove l'hai fatta?
<br></br>
Bene, è arrivato il momento di porre fine alla confusione! <br></br> Con la mia app, puoi caricare le tue foto, aggiungere titoli e descrizioni memorabili, e salvare con precisione la latitudine e la longitudine per non dimenticare mai il luogo esatto del tuo momento speciale.
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
      <PhotoGrid photos={[...uploadedPhotos, ...mockPhotos]} />
      <div>
      {uploadedImageUrl && <UploadedImagePreview imageUrl={uploadedImageUrl} />}
    </div>
    </div>
    </>
  );
}

export default FrontPage;