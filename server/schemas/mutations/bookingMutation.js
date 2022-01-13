const graphql = require('graphql')
const { UserType, AuthType, HotelType, BookingType, PeopleType } = require("../Type.js")
const bcrypt = require('bcryptjs')
const User = require("../../models/User.js")
const Hotel = require("../../models/Hotel.js")
const verifyToken = require('../../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken')
const Room = require('../../models/Room.js')
const Booking = require("../../models/Booking.js")
const GraphQLDate = require('graphql-date')
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51Hr13fE7BvSkBO4pKZaivsbiLMdykp67V4jDLs2sb8Gjuu9crHPBs9yHKv59acXvEa89INAoNgL2PXHPOcdGgnDc005AlcrJd1');

const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLBoolean
} = graphql


const addBooking = { // For adding new booking
    type: BookingType,
    args: {
        from: { type: new GraphQLNonNull(GraphQLDate) },
        to: { type: new GraphQLNonNull(GraphQLDate) },
        roomNumbers: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
        paid: { type: new GraphQLNonNull(GraphQLBoolean) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        bookedBy: { type: new GraphQLNonNull(GraphQLID) },
        people: { type: PeopleType },
        room: { type: new GraphQLNonNull(GraphQLID) },
        hotel: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
        let hotelData = await Hotel.findById(args.hotel)
        if (!hotelData) throw new Error('Hotel ID is wrong.')
        let roomData = await Room.findById(args.room)
        if (!roomData) throw new Error('Room ID is wrong.')

        let query = await Booking.findOne({ from: args.from, to: args.to, room: args.room })
        if (query) {
            throw new Error('Cannot book room(s) on same date.')
        }
        else {

            let cntDays = Math.abs(new Date(args.to).getDate() - new Date(args.from).getDate()) + 1
            const total = args.people.children + args.people.adults

            let booking = new Booking({
                from: args.from,
                to: args.to,
                days: cntDays,
                roomNumbers: args.roomNumbers,
                paid: args.paid,
                amount: args.amount,
                numOfPeople: total,
                location: hotelData.location,
                bookedBy: args.bookedBy,
                people: args.people,
                room: args.room,
                hotel: args.hotel
            })
            let res = await booking.save()
            roomData.bookings.push(res._id)
            await roomData.save()
            return res
        }
    }
}


const cancelBooking = { // For cancelling hotel
    type: BookingType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
        let booking = await Booking.findById(args.id)
        if (!booking) {
            throw new Error('Booking not found.')
        }
        else {
            let room = await Room.findById(booking.room)
            await room.bookings.remove(args.id)
            await room.save()
            let res = await booking.delete()
            return res
        }
    }
}


module.exports = {
    addBooking,
    cancelBooking
}