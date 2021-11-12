const graphql = require('graphql')
const { UserType, AuthType, HotelType } = require("../Type.js")
const bcrypt = require('bcryptjs')
const User = require("../../models/User.js")
const Hotel = require("../../models/Hotel.js")
const verifyToken = require('../../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken')


const { 
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
} = graphql


const addHotel = { // For adding new hotel
    type: HotelType,
    args: {
        image: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        manager: {type: new GraphQLNonNull(GraphQLID)},
        location: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
        let query = await Hotel.findOne({ manager: args.manager })
        if (query) {
            throw new Error('Cannot add multiple hotels.')
        }
        else {
            let hotel = new Hotel({
                image: args.image,
                name: args.name,
                description: args.name,
                location: args.location,
                manager: args.manager,
                rooms: []
            })
            let res = await hotel.save()
            return res
        }
    }
}

const updateProfile = { // For updating hotel
    
}

const deleteHotel = { // For deleting hotel
    
}


module.exports = {
    addHotel
}