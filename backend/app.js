const express = require('express');

const app = express();

const mongoose = require('mongoose');

const path = require('path');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');

app.use(express.json());

mongoose.connect('mongodb+srv://DumontGontran:Piiquante59!@cluster0.jrixf.mongodb.net/myDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;