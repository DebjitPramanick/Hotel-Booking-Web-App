const graphql = require('graphql')
const { UserType, HotelType } = require("../Type.js")
const Hotel = require("../../models/Hotel.js")


const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList
} = graphql


const getHotel = { // For getting hotel details
    type: HotelType,
    args: {
        id: { type: GraphQLID }
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
        let hotels = await Hotel.find({ })
        return hotels
    }
}

module.exports = {
    getHotel,
    getAllHotels
}