const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const User = require('../models/user');

// register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success:false, msg: 'Failed to register user'});
        }else{
            res.json({success:true, msg:'User registered'});
        }
    })
});

// authenticate
router.post('/authenticate', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.getUserByUsername(username);
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        const isMatch = await User.comparePassword(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ data: user }, config.secret, {
                expiresIn: 604800 // 1 week
            });

            res.json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            return res.json({ success: false, msg: 'Wrong password' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
});


// profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
      }
    });
  });

module.exports = router;