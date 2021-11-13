const graphql = require('graphql')
const { UserType, AuthType, HotelType, RoomType } = require("../Type.js")
const bcrypt = require('bcryptjs')
const User = require("../../models/User.js")
const Room = require("../../models/Room.js")
const verifyToken = require('../../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken')
const Hotel = require('../../models/Hotel.js')


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


const addRoom = { // For adding new hotel
    type: RoomType,
    args: {
        hotel: { type: new GraphQLNonNull(GraphQLID)},
        images: { type: new GraphQLList(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        occupancy: { type: new GraphQLNonNull(new GraphQLInputObjectType({
            name: "occupancy",
            fields: {
                children: {type: GraphQLInt},
                adults: {type: GraphQLInt},
            }
        })) },
        others: { type: new GraphQLList(GraphQLString) },
        price: {type: new GraphQLNonNull(GraphQLInt)},
        roomNumbers: {type: new GraphQLNonNull(new GraphQLList(GraphQLInt))},
    },
    async resolve(parent, args) {
        let hotelData = await Hotel.findById(args.hotel)
        if(!hotelData) throw new Error('Hotel ID is wrong.')
        let query = await Room.findOne({ name: args.name, hotel: args.hotel })
        if (query) {
            throw new Error('Cannot add multiple rooms with same name.')
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
                roomNumbers: args.total,
                bookings: []
            })
            let res = await room.save()
            hotelData.rooms.push(res._id)
            await hotelData.save()
            return res
        }
    }
}

const updateRoom = { // For updating hotel
    
}

const deleteRoom = { // For deleting hotel
    
}


module.exports = {
    addRoom
}