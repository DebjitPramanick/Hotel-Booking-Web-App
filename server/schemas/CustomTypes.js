const graphql = require('graphql')
const GraphQLDate = require('graphql-date')
const User = require('../models/User.js')
const Room = require('../models/Room.js')
const Hotel = require('../models/Hotel.js')
const Booking = require('../models/Booking.js')
const { HotelType, RoomType } = require('./Type.js')

const  {
    GraphQLID, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLList
} = graphql

const AvailableHotelType = new GraphQLObjectType({
    name: "AvailableHotel",
    fields: () => ({
        hotel: { 
            type : HotelType,
            resolve(parent, args){
                return parent.hotel
            }
        },
        rooms: {type: GraphQLInt},
    })
})

const AvailableRoomType = new GraphQLObjectType({
    name: "AvailableRoom",
    fields: () => ({
        room: { 
            type : RoomType,
            resolve(parent, args){
                return parent.room
            }
        },
        roomNumbers: {type: new GraphQLList(GraphQLInt)},
    })
})

module.exports = {
    AvailableHotelType,
    AvailableRoomType
}