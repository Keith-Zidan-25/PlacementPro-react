const express = require('express');
const dbUser = require('../Queries/userQueries');
const userRouter = express.Router();

userRouter.get('/profile/:username', async (req, res) => {
    const { username } = req.params;
    const userKey = await dbUser.default.getUserKey(username);

    if (!req.session.user || req.session.user !== userKey) {
        return res.status(403).json({error: 'Unauthorized access' });
    }

    try {
        const userData = await dbUser.default.getUserData(username);

        res.status(200).json({ user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Some Error Occurred' });
    }
});

module.exports = userRouter