
import sjcl from 'sjcl';

const encryptionKey = process.env.encryptionKey; // Replace with a long, random key

function encryptData(data) {
  const ciphertext = sjcl.encrypt(encryptionKey, JSON.stringify(data));
  return ciphertext;
}

function decryptData(encryptedData) {
  try {
    const decryptedData = sjcl.decrypt(encryptionKey, encryptedData);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    return null; // Handle decryption failures gracefully (e.g., clear data)
  }
}
const cypher = {decryptData, encryptData};

export default cypher;
// function storeUserData(userData) {
//   const encryptedData = encryptData(userData);
//   Cookies.set('userData', encryptedData, { expires: 365, secure: true }); // Secure cookie with HTTPS
// }

// function retrieveUserData() {
//   const encryptedData = Cookies.get('userData');
//   if (encryptedData) {
//     return decryptData(encryptedData);
//   }
//   return null; // No data found, handle appropriately
// }