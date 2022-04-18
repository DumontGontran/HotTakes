const Sauce = require('../models/sauce');

const fs = require('fs');

exports.createSauce = async (req, res) => {
  try {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = await new Sauce({
      userId: sauceObject.userId,
      name: sauceObject.name,
      manufacturer: sauceObject.manufacturer,
      description: sauceObject.description,
      mainPepper: sauceObject.mainPepper,
      heat: sauceObject.heat,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    await sauce.save();
    return res.status(201).json({ message: 'Sauce enregistrée !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne !" });
  }
};

exports.getOneSauce = async (req, res) => {
  try {
    let sauce = await Sauce.findOne({ _id: req.params.id });
    if (!sauce) {
      throw res.status(404).json({ message: "Sauce non trouvée !" });
    }
    return res.status(200).json(sauce);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne !" });
  }
};

exports.modifySauce = async (req, res) => {
  try {
    let sauceObject = req.body.sauce ? JSON.parse(req.body.sauce) : req.body;

    if (req.file) {
      let sauce = await Sauce.findOne({ _id: req.params.id });
      fs.unlink(`images/${sauce.imageUrl.split('/images/')[1]}`, async () => {
        sauceObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        await Sauce.updateOne({ _id: req.params.id }, {
          imageUrl: sauceObject.imageUrl
        });
      });
    }
    await Sauce.updateOne({ _id: req.params.id }, {
      userId: sauceObject.userId,
      name: sauceObject.name,
      manufacturer: sauceObject.manufacturer,
      description: sauceObject.description,
      mainPepper: sauceObject.mainPepper,
      heat: sauceObject.heat
    });
    return res.status(200).json({ message: 'Sauce modifiée !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne !" });
  }
};

exports.deleteSauce = async (req, res) => {
  try {
    let sauce = await Sauce.findOne({ _id: req.params.id });
    fs.unlink(`images/${sauce.imageUrl.split('/images/')[1]}`, async () => {
      await sauce.remove();
      return res.status(200).json({ message: 'Sauce supprimée !' });
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne !" });
  }
};

exports.getAllSauces = async (req, res) => {
  try {
    let sauces = await Sauce.find();
    return res.status(200).json(sauces);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne !" });
  }
};