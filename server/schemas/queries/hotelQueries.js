const graphql = require('graphql')
const { UserType, HotelType, BookingType } = require("../Type.js")
const Hotel = require("../../models/Hotel.js")
const Booking = require("../../models/Booking.js")

const GraphQLDate = require('graphql-date')
const { AvailableHotelType } = require('../CustomTypes.js')
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
            throw new Error("Manager ID is required.")
        }
        else {
            let hotel = await Hotel.find({ manager: args.id })
            return hotel[0]
        }
    }
}

const getHotelByID = { // For getting hotel details by ID
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
    type: new GraphQLList(AvailableHotelType),
    args: {
        location: { type: new GraphQLNonNull(GraphQLString) },
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
                    { to: { $gte: args.from, $lte: args.to } }
                ],
                location: args.location,
                numOfPeople: { $gte: args.occupancy }
            }).collation({ locale: 'en', strength: 2 })

            let res = []

            // If there are no bookings for these dates, 
            // return hotel details with number of rooms

            if (bookings.length === 0) {
                let hotels = await Hotel.find({
                    location: args.location
                }).collation({ locale: 'en', strength: 2 })

                hotels.forEach(h => {
                    res.push({ hotel: h, rooms: h.totalRooms })
                })
                return res
            }


            // If there are bookings for these dates, 
            // show number of available rooms

            let map = new Map()
            bookings.forEach(b => {
                let k = b.hotel.toString()
                let c = map.has(k) ? map.get(k) : new Set()
                b.roomNumbers.forEach(r => c.add(r))
                map.set(k, c)
                return b.hotel
            })

            let hotelIds = []
            let qHotels = await Hotel.find({ _id: { $in: hotelIds } })
            qHotels.forEach(q => {
                let k = q._id.toString()
                if (map.has(k) && q.totalRooms > map.get(k).size) {
                    hotelIds.push(q._id)
                }
            })

            let hotels = await Hotel.find({ _id: { $nin: hotelIds } })
            hotels.forEach(h => {
                let k = h._id.toString()
                let avR = h.totalRooms - (map.has(k) ? map.get(k).size : 0)
                res.push({ hotel: h, rooms: avR })
            })
            return res
        }
    }
}

module.exports = {
    getHotel,
    getAllHotels,
    searchHotels,
    getHotelByID
}