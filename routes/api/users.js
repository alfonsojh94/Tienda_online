const router = require('express').Router();
const bcrypt = require("bcryptjs");
const { checkToken } = require('../../helpers/middlewares');
const { createToken } = require('../../helpers/utils');

const User = require('../../models/user.model');

router.get('/profile', checkToken, (req, res) => {
    const user = { ...req.user._doc };
    delete user.password;
    res.json(user);
});

router.post('/register', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.json({ error: err.message })
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: 'Error email y/o contraseña' });
    }

    const equals = bcrypt.compareSync(password, user.password);
    if (!equals) {
        return res.json({ error: 'Error email y/o contraseña' });
    }

    res.json({
        success: 'Login correcto',
        token: createToken(user)
    })
});
module.exports = router;