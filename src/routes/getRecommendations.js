const colourProximity = require('colour-proximity');
const rgbHex = require('rgb-hex');

// Retourne la valeur de proximité des couleurs dominantes des 2 produits passé en paramètre
function getColourProximity(product1, product2) {
  return colourProximity.proximity(
    colorToHex(product1.dominantColor),
    colorToHex(product2.dominantColor)
  );
}

// Retourne la valeur hexadécimale correspondante à l'object RGB passé en paramètre
function colorToHex(color) {
  return '#' + rgbHex(color.red, color.green, color.blue);
}

// Renvoie les 5 produits dont la couleur dominante est la plus proche de celle du produit dont l'ID est passé en paramètre
module.exports = function getRecommendations(req, res) {
  const productId = req.query.id;

  // const products = getProducts();
  const products = require('../../products.json'); // Chargement de la liste produits précalculée

  // Recherche du produit à partir de l'ID
  const product = products.find(p => p.id === productId);
  // Si le produit n'est pas trouvé, renvoyer "400 Invalid ID"
  if (!product) {
    res.status(400).send('Invalid ID');
    return;
  }

  const closestColors = [];

  // Pour chaque produit...
  for (let i = 0; i < products.length; i++) {
    // Passer le même produit
    if (product.id === products[i].id) continue;

    const currentColourProximity = getColourProximity(product, products[i]);

    // Si il y a moins de 5 produits, l'ajouter
    if (typeof closestColors[4] === 'undefined') {
      closestColors.push({
        product: products[i],
        proximity: currentColourProximity
      });
      // Sinon si la couleur est plus proche que le dernier de la liste, échanger
    } else if (currentColourProximity < closestColors[4].proximity) {
      closestColors[4] = { product: products[i], proximity: currentColourProximity };
    }

    // Trier la liste
    closestColors.sort(function(a, b) {
      return a.proximity - b.proximity;
    });
  }

  res.status(200).json(closestColors);
};
