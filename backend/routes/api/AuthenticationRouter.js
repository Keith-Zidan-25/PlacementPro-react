const express = require('express');
const nodemailer = require('nodemailer');
const argon2 = require('argon2');
const db = require('../../Queries/userQueries');

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
        console.log('Signin API called....')
        const existingUser = await db.default.checkIfEmailExists(email);

        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email is already in use' });
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
                return res.status(400).json({ success: false, error: 'Failed to Send Verification Code'});
            }
        });

        req.session.userData = { username: username, email: email, password: hashedPassword };
        req.session.CODE = OTP;
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(507).json({ error: 'Session not saved' });
            }
            console.log('OTP Sent...')
            res.status(200).json({ success: true, msg: 'OTP Sent' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Some Error Occurred' });
    }
});

authRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Signin API called.....')
        const userData = await db.default.getUserData(username);

        if (!userData) {
            return res.status(404).json({ success: false, error: 'User Not Found' });
        }
        const flag = await argon2.verify(userData.password, password);
        
        if (flag) {
            req.session.user = userData.userkey;
            req.session.username = username;
            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.status(507).json({ success: false, error: 'Session not saved' });
                }
            });

            console.log(req.session.user)

            res.status(200).json({ success: true, redirect: `/user/profile/${username}` });
        } else {
            res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Some Error Occurred' });
    }
});

authRouter.post('/verify', async (req, res) => {
    const { code } = req.body;
    
    try {
        if (req.session.CODE === parseInt(code)) {
            const { username, email, password } = req.session.userData;
            await db.default.insertNewUserData(username, password, email);
    
            const userKey = await db.default.getUserKey(username);
            req.session.user = userKey.userkey;
            req.session.username = username;
    
            delete req.session.userData;
            delete req.session.CODE;
    
            res.status(200).json({ success: true, msg: 'Registration Successful', redirect: `/user/profile/${username}`});
        } else {
            res.status(400).json({ success: false, error: 'Incorrect OTP, please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Some Error has Occured' });
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
            return res.status(507).json({ success: false, error: 'Session not saved' });
        }
    });

    if (req.session.resendAttempts >= 3) {
        return res.status(400).json({ success: false, error: 'OTP resend limit exceeded. Please try again later.' });
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: 'Failed to resend OTP' });
        }
        res.status(200).json({ success: true, msg: 'New OTP sent to your email' });
    });
});

authRouter.get('/signout', async (req, res) => {
    req.session.destroy(() => {
        if (err) console.log(err);
    });
    res.status(200).json({ success: true, redirect: '/' });
});

module.exports = authRouter