const graphql = require('graphql')
const { UserType, RoomType } = require("../Type.js")
const Room = require("../../models/Room.js")
const Hotel = require("../../models/Hotel.js")
const Booking = require('../../models/Booking.js')
const GraphQLDate = require('graphql-date')
const { AvailableRoomType } = require('../CustomTypes.js')

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList
} = graphql


const getRoom = { // For getting room details
    type: RoomType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        if (!args.id) {
            throw new Error("Room ID is required.")
        }
        else {
            let room = await Room.findById(args.id)
            return room
        }
    }
}

const getAllRooms = { // For getting room details
    type: new GraphQLList(RoomType),
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        let hotel = await Hotel.findById(args.id)
        if (!args.id) {
            throw new Error("Hotel ID is required.")
        }
        let res = []
        res = hotel.rooms.map(async r => await Room.findById(r))
        return res
    }
}

const getAvailableRooms = { // For getting room details
    type: new GraphQLList(AvailableRoomType),
    args: {
        hotelId: { type: new GraphQLNonNull(GraphQLID) },
        from: { type: new GraphQLNonNull(GraphQLDate) },
        to: { type: new GraphQLNonNull(GraphQLDate) },
        occupancy: { type: new GraphQLNonNull(GraphQLInt) }
    },
    async resolve(parent, args, req) {
        if (!args.hotelId || !args.from || !args.to || !args.occupancy) {
            throw new Error("Data is not sufficient.")
        }
        else {
            let bookings = await Booking.find({
                $or: [
                    { from: { $gte: args.from, $lte: args.to } },
                    { to: { $gte: args.from, $lte: args.to } }
                ],
                hotel: args.hotelId,
                numOfPeople: { $gte: args.occupancy }
            })

            let res = []

            let hotel = await Hotel.findById(args.hotelId)

            // If there are no bookings for these dates, 
            // return all rooms

            if (bookings.length === 0) {
                let res = []
                res = hotel.rooms.map(async r => {
                    let room = await Room.findById(r)
                    return {
                        room: room,
                        roomNumbers: room.roomNumbers
                    }
                })
                return res
            }


            // If there are bookings for these dates, 
            // return available rooms

            let map = new Map()
            let occRooms = []
            bookings.forEach(b => {
                let k = b.hotel.toString()
                let c = map.has(k) ? map.get(k) : new Set()
                b.roomNumbers.forEach(r => c.add(r))
                b.roomNumbers.forEach(r => occRooms.push(r))
                map.set(k, c)
                return b.hotel
            })

            res = hotel.rooms.map(async r => {
                let room = await Room.findById(r)
                let rnArr = []
                room.roomNumbers.forEach(r => {
                    if(!occRooms.includes(r)) {
                        rnArr.push(r)
                    }
                })
                return {
                    room: room,
                    roomNumbers: rnArr
                }
            })
            return res
        }
    }
}

module.exports = {
    getRoom,
    getAllRooms,
    getAvailableRooms
}