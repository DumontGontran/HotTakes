const bcrypt = require('bcrypt');
const joi = require('joi');

module.exports = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().email({ minDomainAtoms: 2 }).required(),
            password: joi.string().min(1).max(80).pattern(new RegExp('^[a-zA-Z0-9!]{3,30}$')).required()
        });

        let valid = await bcrypt.compare(req.body.password, user.password);

        const value = await schema.validateAsync({
            email: req.body.email,
            password: valid
        });

        if (!value) {
            throw res.status(401).json({ message: 'Email ou password invalide !' });
        }
        else {
            next();
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}