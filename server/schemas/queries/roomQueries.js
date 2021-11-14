const graphql = require('graphql')
const { UserType, RoomType } = require("../Type.js")
const Room = require("../../models/Room.js")
const Hotel = require("../../models/Hotel.js")

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
        id: { type: GraphQLID }
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
        id: { type: GraphQLID }
    },
    async resolve(parent, args, req) {
        let hotel = await Hotel.findByID(args.id)
        let res= []
        res = hotel.rooms.map(async r => await Room.findByID(r))
        return res
    }
}

module.exports = {
    getRoom,
    getAllRooms
}