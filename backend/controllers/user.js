const bcrypt = require('bcrypt');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    let hash = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
      email: req.body.email,
      password: hash
    });
    
    if (!hash) {
      throw res.status(400).json({ error });
    }
    await user.save();
    return res.status(201).json({ message: 'Utilisateur créé !' });
  }
  catch (error) {
    return res.status(500).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw res.status(404).json({ error: 'Utilisateur non trouvé !' });
    }
    let valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
      throw res.status(401).json({ error: 'Mot de passe incorrect !' });
    }
    return res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        { userId: user._id },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
      )
    });
  }
  catch (error) {
    return res.status(500).json({ error });
  }
};