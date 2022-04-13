const Sauce = require('../models/sauce');

const fs = require('fs');

exports.createSauce = async (req, res) => {
  try {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = await new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    if(!sauce){
      throw res.status(400).json({ error });
    }
    await sauce.save();
    return res.status(201).json({ message: 'Sauce enregistrée !' });
  }
  catch (error) {
    return res.status(500).json({ error });
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
    return res.status(500).json({ message: "Erreur interne !" });
  }
};

exports.modifySauce = async (req, res) => {
  try {
    let sauceObject = { ...req.body };
    let sauce = await Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id });

    if (req.file) {
      sauceObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    if (!sauce) {
      throw res.status(400).json({ error });
    }
    return res.status(200).json({ message: 'Sauce modifiée !' });
  }
  catch (error) {
    return res.status(500).json({ error });
  }
};

exports.deleteSauce = async (req, res) => {
  try {
    let sauce = await Sauce.findOne({ _id: req.params.id });
    fs.unlink(`images/${sauce.imageUrl.split('/images/')[1]}`, async (err) => {
      if (!sauce) {
        throw res.status(400).json({ error });
      }
      await sauce.remove();
      return res.status(200).json({ message: 'Sauce supprimée !' });
    });
  }
  catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getAllSauces = async (req, res) => {
  try {
    let sauces = await Sauce.find();
    if (!sauces) {
      throw res.status(400).json({ error });
    }
    return res.status(200).json(sauces);
  }
  catch (error) {
    return res.status(500).json({ error });
  }
};