# testEarlyBirds

Stack utilise : Node.js/Express.js

Initialisation de l'api :
Commande : npm i
Creer un fichier .env :
  HTTP_PORT = 3000
  GOOGLE_APPLICATION_CREDENTIALS = api_key.json
  
Creer un fichier api_key.json contenant l'API KEY fourni par Google.

Commande : npm run start

Endpoints :

POST /products avec le parametre "csv" contenant l'URL du fichier CSV, exemple : localhost:3000/products?csv=products_eb_test_technique.csv : Creation et renvoie de la liste des produit liste de produits

GET /dominantdolors : Ajoute les couleurs dominantes a la liste de produits et renvoie cette liste
