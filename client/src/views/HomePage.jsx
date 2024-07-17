import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import PhotoUploadForm from '../components/PhotoUploadForm';
import UploadedImagePreview from './UploadedImagePreview';
import '../App.css'

function HomePage ({ photos, mockPhotos }) {

const [uploadedPhotos, setUploadedPhotos] = useState([]);
const [uploadedImageUrl, setUploadedImageUrl] = useState('');
const [lastUploadedUrl, setLastUploadedUrl] = useState('');

const handlePhotoUpload = (url) => {
setUploadedImageUrl(url);
setLastUploadedUrl(url);
};

useEffect(() => {
  fetchLastUploadedUrl();
}, []);

const fetchLastUploadedUrl = async () => {
  try {
    const response = await fetch('/api/photos');
    if (response.ok) {
      const data = await response.json();
      setLastUploadedUrl(data.url);
    } else {
      console.error('Failed to fetch last URL');
    }
  } catch (error) {
    console.error(error);
  }
};

 
  return (
    <>
    <PhotoUploadForm onPhotoUpload={handlePhotoUpload} setUploadedImageUrl={setUploadedImageUrl} />
    <div className="Frontpage">
      <div className='introduction'>
      <p>
Hai mai scattato una foto incredibile e poi hai trascorso ore a cercare di ricordare dove l'hai fatta?
<br></br>
Bene, è arrivato il momento di porre fine alla confusione! <br></br> Con la mia app puoi caricare le tue foto, aggiungere titoli e descrizioni memorabili, e salvare con precisione la latitudine e la longitudine per non dimenticare mai il luogo esatto del tuo momento speciale.
<br></br>
Usa la sezione apposita di SNAPIFY per caricare sull'app le tue foto. Seleziona i parametri (titolo, descrizione, latitudine e longitudine), poi immetti l'URL dell'immagine che preferisci. Troverai le tue foto caricate sulla mappa (Map) e sulla galleria (Gallery) accessibili tramite il menu in alto a destra.
<br></br>
<br></br>
{/* Clicca sulla mappa per impostare le tue foto alla posizione (longitude, latitude) che preferisci. Ti basterà caricare la foto dopo aver cliccato sulla mappa!
<br></br>
Altrimenti, usa il geolocalizzatore per salvare la foto alla tua posizione! */}
<br></br>
Desideri visualizzare tutte le tue foto in un colpo d'occhio? Basta un clic su "Gallery" e avrai accesso a una galleria completa dei tuoi ricordi.
<br></br>
Stai cercando quella foto specifica del barbecue del 2010? Inserisci il titolo della foto nella barra di ricerca situata nella galleria e la troverai in un attimo.
<br></br>
Esplora la sezione "Profile" per scoprire i luoghi che hai visitato, dove hai localizzato le tue foto.
<br></br>
Presto sarà disponibile anche la funzione per  caricare direttamente l'immagine da file, anziché inserire un URL. Voglio un'app che gestisca tutto senza problemi: perché, diciamocelo, il Wi-Fi può essere complicato a volte.
<br></br>
<br></br>
Grazie per aver scelto SNAPIFY!
<br></br>
Spero che ti aiuti a rivivere i tuoi momenti speciali e a non perdere mai più un ricordo. <br></br>Dopotutto, la memoria è un po' come una vecchia scatola di biscotti: piena di sorprese!
</p>
<br></br>
      </div>
       <p>Prova questa mappa con i click! Visualizzerai le foto inserite nella gallery. Se invece vuoi vedere le tue foto, caricate tramite l'apposita sezione sulla mappa, vai sul Menu/Map. Lì troverai una mappa più grande.</p>
      <MapComponent photos={[...uploadedPhotos, ...mockPhotos]} lastUploadedUrl={lastUploadedUrl} setLastUploadedUrl={setLastUploadedUrl} />
      <p>Queste sono le mie foto-esempio. Scorri per vedere la preview della tua ultifa foto caricata. <br></br>
      Vai su menu/Gallery per vedere tutte le altre tue foto!</p>
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

export default HomePage;