const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    username: {type: String, trim: true, required: true},
    password: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true},
    address: {type: String},
    avatar: {type: String, trim: true},
    bio: {type: String},
    followers: [],
    following: [],
    likes: {type: Number, default: 0},
    slogan: {
        idSlogan: {type: String},
        bodySlogan: {type: String}
    }
}, {collection: 'users'});

userSchema.methods.hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
userSchema.methods.comparePassword = (password, hash) => bcrypt.compareSync(password, hash); 

module.exports = mongoose.model('users', userSchema, 'users');