# ÉTAPES POUR INITIALISER LE PROJET

## Coté Frontend et Backend

1. Installez Node.js sur votre ordinateur en vous rendant sur https://nodejs.org/en/ .
2. vérifiez que Node.js a bien été installé sur votre ordinateur avec la commande: `node -v`.  

## Coté Frontend

1. `npm install` dans le dossier frontend pour installer les node_modules.
2. Vérifiez que npm a bien été installé sur votre ordinateur avec la commande: `npm -v`.
3. `npm install @angular/cli` dans le dossier frontend pour installer angular, afin d'initialiser, de développer, d'échafauder et de maintenir des applications angular.
4. `npm start` (recommandée pour ce projet) ou `ng serve` (possible si vous utilisez VSCode) pour utiliser le Frontend en localhost avec le port: 4200. 
5. Se rendre sur http://localhost:4200 via votre navigateur internet.

## Coté Backend

### Les npm install à utiliser absolument dans le dossier backend pour ce projet

1. `npm install` pour installer les node_modules. 
2. `npm install joi` pour installer le package de validation de données. 
3. `npm install bcrypt` pour installer le package de hash de mot de passe.
4. `npm install nodemon` pour installer le package de reload serveur à chaque changement apporté à vos fichiers du dossier backend.
5. `npm install mongoose` pour installer le package afin d'accèder à votre DB mongoDB.
6. `npm install mongoose-unique-validator` pour installer le package d'ajout d'une validation de pré-enregistrement pour les champs uniques dans un schéma Mongoose.
7. `npm install express` pour installer le framework utilisé pour la création de l'API backend. 
8. `npm install multer` permet de mettre en place le middleware pour la gestion des données notamment le téléchargement de fichiers. 
9. `npm install jsonwebtoken` permet l'échange sécurisé de jetons (tokens) entre plusieurs parties. 

### Fichier .env du dossier backend

1. Renommez le fichier .env_sample en .env 
2. Créez votre base de données sur mongoDB
3. Renseignez ensuite vos informations dans les champs correspondants.

#### Exemple:
`MONGODB_USER = "mettez votre username ici"`  
`MONGODB_PASSWORD = "mettez votre password ici"`  
`MONGODB_CLUSTER_NAME = "mettez votre cluster ici"`  
`MONGODB_DATABASE_NAME = "mettez votre nom de DB ici"`  

4. Renseignez votre token secret dans le champs correspondant. 

#### Exemple:
`SECRET_TOKEN = "mettez votre token secret ici"`

5. Une fois tout cela fait votre environnement de travail est sécurisé !