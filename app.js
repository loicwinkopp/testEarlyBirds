const express = require('express');
const path = require('path');
const indexRouter = require('./src/routes/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Gestion de la liste de produits
let products;

function saveProducts(newProducts) {
  products = newProducts;
}

function getProducts() {
  return products;
}

app.use('/', indexRouter(saveProducts, getProducts));

module.exports = app;
