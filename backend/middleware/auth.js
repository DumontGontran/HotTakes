require('dotenv').config('../.env');

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw res.status(403).json({ message: 'user ID invalide !' });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};