const express = require('express');
const nodemailer = require('nodemailer');
const argon2 = require('argon2');
const db = require('../../Queries/UserQuery');

const authRouter = express.Router();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

authRouter.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await db.checkIfEmailExists(email);

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const hashedPassword = await argon2.hash(password);
        const OTP = Math.floor(100000 + Math.random() * 900000);

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'PlacementPro Verification Code',
            text: `Your Verification code is ${OTP}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).json({error: 'Failed to Send Verification Code'});
            }
        });

        req.session.userData = { username: username, email: email, password: hashedPassword };
        req.session.CODE = OTP;
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Session not saved' });
            }
            res.status(200).json({ success: 'OTP sent', redirect: '/verify' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Some Error Occurred' });
    }
});

authRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = await db.getUserData(username);

        if (!userData) {
            return res.status(404).json({ error: 'User Not Found' });
        }
        const flag = await argon2.verify(password, userData.PASSWORD);
        
        if (flag) {
            req.session.user = userData.USERKEY;
            req.session.username = username;
            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.status(500).json({ error: 'Session not saved' });
                }
            });

            res.status(200).json({ redirect: `/user/profile/${username}` });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Some Error Occurred' });
    }
});

authRouter.post('/verify', async (req, res) => {
    const { code } = req.body;
    console.log(code, "Type: ", typeof code)
    console.log(req.session.CODE, "Type: ", typeof req.session.CODE);
    try {
        if (req.session.CODE === parseInt(code)) {
            const { username, email, password } = req.session.userData;
            await db.insertNewUserData(username, password, email);
    
            const userKey = await db.getUserKey(username);
            req.session.user = userKey.USERKEY;
            req.session.username = username;
    
            delete req.session.userData;
            delete req.session.CODE;
    
            res.status(200).json({ success: 'Registration Successful', redirect: `/user/profile/${username}`});
        } else {
            res.status(400).json({ error: 'Incorrect OTP, please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Some Error has Occured' });
    }
});

authRouter.post('/resend-code', async (req, res) => {
    const { email } = req.session.userData;
    const newOTP = Math.floor(100000 + Math.random() * 900000);

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'PlacementPro Verification Code',
        text: `Your verification code is ${newOTP}`
    };

    req.session.resendAttempts = (req.session.resendAttempts || 0) + 1;
    req.session.CODE = newOTP;
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            return res.status(500).json({ error: 'Session not saved' });
        }
    });

    if (req.session.resendAttempts >= 3) {
        return res.status(400).json({ error: 'OTP resend limit exceeded. Please try again later.' });
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to resend OTP' });
        }
        res.status(200).json({ success: 'New OTP sent to your email' });
    });
});

authRouter.get('/signout', async (req, res) => {
    req.session.destroy(() => {
        if (err) console.log(err);
    });
    res.status(200).json({ redirect: '/' });
});

module.exports = authRouter