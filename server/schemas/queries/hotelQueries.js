const graphql = require('graphql')
const { UserType, HotelType, BookingType } = require("../Type.js")
const Hotel = require("../../models/Hotel.js")
const Booking = require("../../models/Booking.js")

const GraphQLDate = require('graphql-date')
const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList
} = graphql


const getHotel = { // For getting hotel details
    type: HotelType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        if (!args.id) {
            throw new Error("Hotel ID is required.")
        }
        else {
            let hotel = await Hotel.findById(args.id)
            return hotel
        }
    }
}

const getAllHotels = { // For getting hotel details
    type: new GraphQLList(HotelType),
    async resolve(parent, args, req) {
        let hotels = await Hotel.find({})
        return hotels
    }
}

const searchHotels = { // For searching available hotels
    type: new GraphQLList(HotelType),
    args: {
        location: { type: new GraphQLNonNull(GraphQLID) },
        from: { type: new GraphQLNonNull(GraphQLDate) },
        to: { type: new GraphQLNonNull(GraphQLDate) },
        occupancy: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(parent, args, req) {
        if (!args.location || !args.from || !args.to || !args.occupancy) {
            throw new Error("Data is not sufficient.")
        }
        else {
            let bookings = await Booking.find({
                $or: [
                    { from: { $gte: args.from, $lte: args.to } },
                    { to: { $lte: args.to, $gte: args.from } }
                ],
                location: args.location,
                numOfPeople: { $gte: args.occupancy }
            })
            let hotelIds = bookings.map(b => b.hotel)

            let hotels = await Hotel.find({_id: {$nin: hotelIds}})
            return hotels
        }
    }
}

module.exports = {
    getHotel,
    getAllHotels,
    searchHotels
}