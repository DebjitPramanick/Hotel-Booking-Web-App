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

const getAllBookings = { // For getting booking details
    type: new GraphQLList(BookingType),
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        let room = await Room.findById(args.id)
        if (!args.id) {
            throw new Error("Room ID is required.")
        }
        let res= []
        res = room.bookings.map(async b => await Booking.findById(b))
        return res
    }
}

module.exports = {
    getBooking,
    getAllBookings
}