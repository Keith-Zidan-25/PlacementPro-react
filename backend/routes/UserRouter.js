const express = require('express');
const dbUser = require('../Queries/userQueries');
const userRouter = express.Router();

userRouter.get('/profile/:username', async (req, res) => {
    const { username } = req.params;
    const userKey = await dbUser.default.getUserKey(username);

    console.log(`Received data: ${userKey}`);
    console.log(`cookie data: ${req.session.user}`);

    if (!req.session.user || req.session.user !== userKey) {    
        return res.status(403).json({error: 'Unauthorized access' });
    }

    try {
        const userData = await dbUser.default.getUserData(username);
        res.status(201).json({ user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Some Error Occurred' });
    }
});

userRouter.post('/user-details', async (req, res) => {
    const data = req.body;

    try {
        if (!req.session.user) {
            return res.status(403).json({error: 'Unauthorized access' });
        } 
        const userkey = req.session.user;
        const result = await dbUser.default.upsertPersonalDetails(userkey, data);

        if (!result.success) {
            return res.status(404).json({ success: false, msg: result.msg });
        }
        res.status(201).json({ success: true, msg: "User Details Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, msg: "unknown server error"});
    }
});

module.exports = userRouter