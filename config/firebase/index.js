const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'eduhub-178da.appspot.com'
});

const bucket = getStorage().bucket();

module.exports = {
  bucket,
}