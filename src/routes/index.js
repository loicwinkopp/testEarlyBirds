module.exports = function(saveOrder, getOrder) {
  const express = require('express');
  const csv = require('csvtojson');

  const router = express.Router();

  // Creation d'une liste de produits
  router.post('/list', async function(req, res) {
    saveProductList(await csv().fromFile(req.query.csv));
    res.status(200).send('Product list received');
  });

  return router;
};
