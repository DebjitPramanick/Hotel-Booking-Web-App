const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookingSchema = new Schema({
    from: Date,
    to: Date,
    days: Number,
    roomNumbers: [Number],
    bookedOn: {type: Date, default: Date.now},
    paid: Boolean,
    amount: Number,
    location: String,
    numOfPeople: Number,
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    people: {children: Number, adults: Number},
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }
})

module.exports = new mongoose.model('Booking', BookingSchema)