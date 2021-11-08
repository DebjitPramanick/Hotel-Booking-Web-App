const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String, 
    age: Number,
    accessToken: String,
    refreshToken: String,
    accessTokenExp: String,
    refreshTokenExp: String,
    isAdmin: Boolean,
    isManager: Boolean
})

module.exports = new mongoose.model('User', UserSchema)