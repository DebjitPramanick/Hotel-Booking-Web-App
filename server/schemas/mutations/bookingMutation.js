const graphql = require('graphql')
const { UserType, AuthType, HotelType, BookingType } = require("../Type.js")
const bcrypt = require('bcryptjs')
const User = require("../../models/User.js")
const Hotel = require("../../models/Hotel.js")
const verifyToken = require('../../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken')
const Room = require('../../models/Room.js')
const Booking = require("../../models/Booking.js")
const GraphQLDate = require('graphql-date')


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


const addBooking = { // For adding new hotel
    type: BookingType,
    args: {
        from: {type: new GraphQLNonNull(GraphQLDate)},
        to: {type: new GraphQLNonNull(GraphQLDate)},
        roomNumber: {type: new GraphQLNonNull(GraphQLInt)},
        paid: {type: new GraphQLNonNull(GraphQLBoolean)},
        amount: {type: new GraphQLNonNull(GraphQLInt)},
        bookedBy: {type: new GraphQLNonNull(GraphQLID)},
        people: {type: new GraphQLInputObjectType({
            name: "people",
            fields: {
                children: {type: GraphQLInt},
                adults: {type: GraphQLInt},
            }
        })},
        room: {type: new GraphQLNonNull(GraphQLID)},
        hotel: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent, args) {
        let hotelData = await Hotel.findById(args.hotel)
        if(!hotelData) throw new Error('Hotel ID is wrong.')
        let roomData = await Room.findById(args.room)
        if(!roomData) throw new Error('Room ID is wrong.')

        let query = await Booking.findOne({ from: args.from, to: args.to, room: args.room })
        if (query) {
            throw new Error('Cannot book room(s) on same date.')
        }
        else {

            let cntDays = Math.abs(new Date(args.to)-new Date(args.from)) + 1

            let booking = new Booking({
                from: args.from,
                to: args.to,
                days: cntDays,
                roomNumber: args.roomNumber,
                paid: args.paid,
                amount: args.amount,
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

const updateBooking = { // For updating hotel
    
}

const cancelBooking = { // For cancelling hotel
    
}


module.exports = {
    addBooking
}