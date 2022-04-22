const Sauce = require('../models/sauce');

exports.likeSauce = async (req, res) => {
    try {
        let sauce = await Sauce.findOne({ _id: req.params.id });
        if (!sauce) {
            throw res.status(404).json({ message: 'Sauce introuvable !' });
        }

        switch (req.body.like) {
            case 1:
                if (!sauce.usersLiked.includes(req.body.userId)) {
                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: 1 },
                            $push: { usersLiked: req.body.userId }
                        }
                    )
                }
                break;
            case -1:
                if (!sauce.usersDisliked.includes(req.body.userId)) {
                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: 1 },
                            $push: { usersDisliked: req.body.userId }
                        }
                    )
                }
                break;
            case 0:
                if (sauce.usersLiked.includes(req.body.userId)) {
                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        }
                    )
                }

                if (sauce.usersDisliked.includes(req.body.userId)) {
                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId }
                        }
                    )
                }
                break;
        }
        return res.status(200).json({ message: 'Like/Dislike mis à jour !' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne !' });
    }
};