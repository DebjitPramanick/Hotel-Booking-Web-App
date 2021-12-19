const graphql = require('graphql')
const { UserType, AuthType, HotelType, RoomType, ImageType } = require("../Type.js")
const bcrypt = require('bcryptjs')
const User = require("../../models/User.js")
const Room = require("../../models/Room.js")
const verifyToken = require('../../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken')
const Hotel = require('../../models/Hotel.js')
const Booking = require("../../models/Booking.js")

const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLFloat
} = graphql


const addRoom = { // For adding new room
    type: RoomType,
    args: {
        hotel: { type: new GraphQLNonNull(GraphQLID) },
        images: { type: new GraphQLList(ImageType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        occupancy: { type: new GraphQLNonNull(GraphQLInt) },
        others: { type: new GraphQLList(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        roomNumbers: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
    },
    async resolve(parent, args) {
        let hotelData = await Hotel.findById(args.hotel)
        if (!hotelData) throw new Error('Hotel ID is wrong.')
        let query = await Room.findOne({ name: args.name, hotel: args.hotel })
        if (query) {
            throw new Error('Cannot add multiple rooms with same name.')
        }
        let ass = []
        args.roomNumbers.forEach(n => {
            if (hotelData.roomsMap.get(n.toString())) ass.push(n)
        })
        if (ass.length > 0) {
            throw new Error('Some room numbers are already assigned. Please try different room numbers.')
        }
        else {
            let room = new Room({
                hotel: args.hotel,
                images: args.images,
                name: args.name,
                description: args.description,
                occupancy: args.occupancy,
                others: args.others,
                price: args.price,
                roomNumbers: args.roomNumbers,
                bookings: []
            })
            let res = await room.save()
            hotelData.rooms.push(res._id)
            room.roomNumbers.forEach(n => {
                hotelData.roomsMap.set(n.toString(), room.name)
            })

            await hotelData.save()
            return res
        }
    }
}

const updateRoom = { // For updating room
    type: RoomType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        images: { type: new GraphQLList(ImageType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        occupancy: { type: new GraphQLNonNull(GraphQLInt) },
        others: { type: new GraphQLList(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        roomNumbers: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
    },
    async resolve(parent, args) {
        if (!args.id) throw new Error("ID is not given.");

        let room = await Room.findByIdAndUpdate(args.id, {
            id: args.id,
            images: args.images,
            name: args.name,
            description: args.description,
            occupancy: args.occupancy,
            others: args.others,
            price: args.price,
            roomNumbers: args.roomNumbers,
        }, { new: true })

        let hotelData = await Hotel.findById(room.hotel)
        
        room.roomNumbers.forEach(n => {
            if(!hotelData.roomsMap.get(n.toString())){
                hotelData.roomsMap.set(n.toString(), room.name)
            }
        })

        await hotelData.save()
        return room
    }
}

const deleteRoom = { // For deleting room
    type: RoomType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
        let room = await Room.findById(args.id)
        if (!room) {
            throw new Error('Room not found.')
        }
        else {
            let hotel = await Hotel.findById(room.hotel)
            room.roomNumbers.forEach(n => {
                hotel.roomsMap.delete(n.toString())
            })
            await hotel.rooms.remove(args.id)
            await hotel.save()
            room.bookings.forEach(async b => {
                let booking = await Booking.findById(b._id)
                await booking.delete()
            })
            let res = await room.delete()
            return res
        }
    }
}


module.exports = {
    addRoom,
    updateRoom,
    deleteRoom
}