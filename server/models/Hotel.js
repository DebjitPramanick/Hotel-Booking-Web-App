const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HotelSchema = new Schema({
    image: String,
    name: String,
    description: String,
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    addedOn: {type: Date, default: Date.now},
    location: String,
    ratings: {type: Number, default: null},
    totalRooms: Number,
    roomsMap: {type: Map, of: String, required: true}
})

module.exports = new mongoose.model('Hotel', HotelSchema)