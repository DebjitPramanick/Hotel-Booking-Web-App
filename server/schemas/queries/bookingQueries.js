const graphql = require('graphql')
const { UserType, BookingType } = require("../Type.js")
const Room = require("../../models/Room.js")
const Booking = require("../../models/Booking.js")

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList
} = graphql


const getBooking = { // For getting booking details
    type: BookingType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        if (!args.id) {
            throw new Error("Booking ID is required.")
        }
        else {
            let booking = await Booking.findById(args.id)
            return booking
        }
    }
}

const getAllBookings = { // For getting all booking details
    type: new GraphQLList(BookingType),
    async resolve(parent, args, req) {
        let bookings = await Booking.find({})
        return bookings
    }
}

const getUserBookings = { // For getting user's booking details
    type: new GraphQLList(BookingType),
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        if (!args.id) {
            throw new Error("User ID is required.")
        }
        else {
            let booking = await Booking.find({bookedBy: args.id})
            return booking
        }
    }
}

const getRoomBookings = { // For getting booking details
    type: new GraphQLList(BookingType),
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        if (!args.id) {
            throw new Error("Room ID is required.")
        }
        let bookings = await Booking.find({room: args.id})
        return bookings
    }
}

const getHotelBookings = { // For getting booking details
    type: new GraphQLList(BookingType),
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        if (!args.id) {
            throw new Error("Hotel ID is required.")
        }
        let bookings = await await Booking.find({hotel: args.id})
        return bookings
    }
}

module.exports = {
    getBooking,
    getRoomBookings,
    getUserBookings,
    getHotelBookings,
    getAllBookings
}