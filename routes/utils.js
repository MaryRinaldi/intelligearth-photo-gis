/**
 * Decodes a base64 encoded image string into its MIME type and binary data.
 * @param {string} dataString - Base64 encoded image string (e.g., 'data:image/jpeg;base64,...')
 * @returns {Object} An object containing 'type' (image MIME type) and 'data' (binary image data as Buffer).
 * @throws {Error} Throws an error if the input string is invalid.
 */
function decodeBase64Image(dataString) {
  const matches = dataString.match(/^data:(.+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 image string');
  }

  return {
    type: matches[1], // Image type (e.g., 'image/jpeg')
    data: Buffer.from(matches[2], 'base64'), // Binary image data
  };
}

module.exports = {
  decodeBase64Image,
};
