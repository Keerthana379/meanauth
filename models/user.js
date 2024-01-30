const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// user schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = async function(username) {
    const query = { username: username };
    try {
        const user = await User.findOne(query);
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(newUser.password, salt);
        })
        .then(hash => {
            newUser.password = hash;
            return newUser.save();
        })
        .then(user => {
            callback(null, user);
        })
        .catch(err => {
            callback(err);
        });
};
module.exports.comparePassword = async function(candidatePassword, hash) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, hash);
        return isMatch;
    } catch (err) {
        throw err;
    }
}
