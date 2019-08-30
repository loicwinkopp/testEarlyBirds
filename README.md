# testEarlyBirds

## Technologies utilisées 
Node.js ; Express.js

Créé à l'aide du boilerplate : https://github.com/ZzoNe322/express-boilerplate-js

## Initialisation de l'API
- Commande : `npm i`
- Créer un fichier `api_key.json` contenant l'API KEY fourni par Google.
- Commande : `npm run start`

## Endpoints

`POST /products` avec le paramètre "csv" contenant le chemin du fichier CSV, exemple : `localhost:3000/products?csv=products_eb_test_technique.csv` : Création et renvoie de la liste des produits

`GET /dominantcolors` : Ajoute les couleurs dominantes à la liste de produits et renvoie cette liste

`GET /recommendations` : Renvoie les 5 produits dont la couleur dominante est la plus proche de celle du produit dont l'ID est passé en paramètre
