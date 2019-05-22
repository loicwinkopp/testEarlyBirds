const fetch = require('node-fetch');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const bucketName = 'images-eb75';
const bucket = storage.bucket(bucketName);

module.exports = async function getDominantColors(products, res, index) {
  if (index > products.length - 1) {
    res.status(200).json(products);
    return;
  }

  const i = index || 0;
  const product = products[i];

  // Generation du nom de l'image dans le bucket
  const fileName = 'image' + Math.floor(Date.now() / 1000) + '.jpg';

  // Writestream de l'image
  const file = bucket.file(fileName);
  const writeStream = file.createWriteStream();
  const imageURL = 'http:' + product.photo;

  // Ecriture de l'image dans le bucket
  const fetchRes = await fetch(imageURL);
  fetchRes.body.pipe(writeStream);

  // Lorsque le writeStream est termine...
  writeStream.on('finish', async () => {
    // Appel a l'api Vision
    const [result] = await client.imageProperties(`gs://${bucketName}/${fileName}`);

    const colors = result.imagePropertiesAnnotation.dominantColors.colors;

    // Ajout de l'attribut dominantColor au produit
    product.dominantColor = colors[0].color;

    // Recursion lorsque le writeStream est termine
    getDominantColors(products, res, i + 1);
  });
};
