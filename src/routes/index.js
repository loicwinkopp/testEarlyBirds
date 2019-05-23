module.exports = function(saveProducts, getProducts) {
  const express = require('express');
  const fs = require('fs');
  const csvToJson = require('convert-csv-to-json');
  const getDominantColors = require('./getDominantColors');
  const getRecommendations = require('./getRecommendations');

  const router = express.Router();

  // Création d'une liste de produits
  router.post('/products', function(req, res) {
    if (!fs.existsSync(req.query.csv)) {
      res.status(400).send('File does not exist');
      return;
    }
    saveProducts(csvToJson.getJsonFromCsv(req.query.csv));
    res.status(200).send('Product list received');
  });

  // Ajoute les couleurs dominantes à la liste de produits et renvoie cette liste
  router.get('/dominantcolors', function(req, res) {
    const products = getProducts();

    getDominantColors(products, res);
  });

  // Renvoie les 5 produits dont la couleur dominante est la plus proche de celle du produit dont l'ID est passé en paramètre
  router.get('/recommendations', function(req, res) {
    getRecommendations(req, res);
  });

  return router;
};
