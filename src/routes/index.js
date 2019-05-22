module.exports = function(saveProducts, getProducts) {
  const express = require('express');
  const csvToJson = require('convert-csv-to-json');
  const getDominantColors = require('./getDominantColors');

  const router = express.Router();

  // Creation d'une liste de produits
  router.post('/products', async function(req, res) {
    saveProducts(csvToJson.getJsonFromCsv(req.query.csv));
    res.status(200).send('Product list received');
  });

  // Ajoute les couleurs dominantes a la liste de produits et renvoie cette liste
  router.get('/dominantcolor', async function(req, res) {
    const products = getProducts();

    getDominantColors(products, res);
  });

  return router;
};
