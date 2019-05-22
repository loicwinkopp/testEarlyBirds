const express = require('express');
const path = require('path');
const indexRouter = require('./src/routes/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let productList;

function saveProductList(newProductList) {
  order = newProductList;
}

function getProductList() {
  return productList;
}

app.use('/', indexRouter(saveProductList, getProductList));

module.exports = app;
