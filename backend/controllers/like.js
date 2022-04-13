const Sauce = require('../models/sauce');

exports.likeSauce = async (req, res) => {
    try {
        console.log('Contenu req.body likeCtrl', req.body);
        console.log('Contenu req.params likeCtrl', req.params);
        console.log('id en _id', { _id: req.params.id });

        let sauce = await Sauce.findOne({ _id: req.params.id });
        if (!sauce) {
            throw res.status(400).json({ error });
        }

        console.log('Contenu résultat promise: sauce', sauce);

        switch (req.body.like) {
            case 1:
                if (!sauce.usersLiked.includes(req.body.userId)) {
                    console.log('userId pas dans usersLiked DB et like = 1');

                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: 1 },
                            $push: { usersLiked: req.body.userId }
                        }
                    )
                    return res.status(201).json({ message: 'like +1' });
                }
                break;
            case -1:
                if (!sauce.usersDisliked.includes(req.body.userId)) {
                    console.log('userId pas dans usersDisliked DB et dislike = -1');

                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: 1 },
                            $push: { usersDisliked: req.body.userId }
                        }
                    )
                    return res.status(201).json({ message: 'dislike +1' });
                }
                break;
            case 0:
                if (sauce.usersLiked.includes(req.body.userId)) {
                    console.log('userId est dans usersLiked DB et like = 0');

                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        }
                    )
                    return res.status(200).json({ message: 'like = 0' });
                }

                if (sauce.usersDisliked.includes(req.body.userId)) {
                    console.log('userId est dans usersDisliked DB et dislike = 0');

                    await Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId }
                        }
                    )
                    return res.status(200).json({ message: 'dislike = 0' });
                }
                break;
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};