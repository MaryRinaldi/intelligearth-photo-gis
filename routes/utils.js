function decodeBase64Image(dataString) {
    const matches = dataString.match(/^data:(.+);base64,(.+)$/);
  
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 image string');
    }
  
    return {
      type: matches[1], // Tipo dell'immagine (es. 'image/jpeg')
      data: Buffer.from(matches[2], 'base64'), // Dati binari dell'immagine
    };
  }
  
  module.exports = {
    decodeBase64Image,
  };
  