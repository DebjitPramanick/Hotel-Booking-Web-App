const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String, 
    dob: Date,
    accessToken: String,
    refreshToken: String,
    accessTokenExp: String,
    refreshTokenExp: String,
    isAdmin: {type: Boolean, default: false},
    isManager: {type: Boolean, default: false},
    isBlocked: {type: Boolean, default: false},
    joined: {type: Date, default: Date.now}
})

module.exports = new mongoose.model('User', UserSchema)