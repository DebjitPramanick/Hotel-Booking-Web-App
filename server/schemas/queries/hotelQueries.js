const graphql = require('graphql')
const { UserType, HotelType } = require("../Type.js")
const Hotel = require("../../models/Hotel.js")

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
        let hotels = await Hotel.find({ })
        return hotels
    }
}

const searchHotels = { // For searching available hotels
    type: HotelType,
    args: {
        location: { type: new GraphQLNonNull(GraphQLID) },
        from: { type: new GraphQLNonNull(GraphQLDate) },
        to: { type: new GraphQLNonNull(GraphQLDate) },
        people: {
            type: new GraphQLInputObjectType({
                name: "people",
                fields: {
                    children: { type: GraphQLInt },
                    adults: { type: GraphQLInt },
                }
            })
        },
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

module.exports = {
    getHotel,
    getAllHotels
}