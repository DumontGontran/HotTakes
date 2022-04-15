require('dotenv').config('../.env');

const bcrypt = require('bcrypt');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    let hash = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
      email: req.body.email.toLowerCase(),
      password: hash
    });
    
    await user.save();
    return res.status(201).json({ message: 'Utilisateur créé !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne !" });
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) {
      throw res.status(404).json({ message: 'Utilisateur non trouvé !' });
    }
    let valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
      throw res.status(401).json({ message: 'Mot de passe incorrect !' });
    }
    return res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        { userId: user._id },
        `${process.env.SECRET_TOKEN}`,
        { expiresIn: '24h' }
      )
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne !" });
  }
};