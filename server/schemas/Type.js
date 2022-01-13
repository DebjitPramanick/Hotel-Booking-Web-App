const graphql = require('graphql')
const GraphQLDate = require('graphql-date')
const User = require('../models/User.js')
const Room = require('../models/Room.js')
const Hotel = require('../models/Hotel.js')
const Booking = require('../models/Booking.js')

const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInputObjectType
} = graphql


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        dob: { type: GraphQLDate },
        accessToken: { type: GraphQLString },
        refreshToken: { type: GraphQLString },
        accessTokenExp: { type: GraphQLString },
        refreshTokenExp: { type: GraphQLString },
        isManager: { type: GraphQLBoolean },
        isAdmin: { type: GraphQLBoolean },
        isBlocked: { type: GraphQLBoolean },
        joined: { type: GraphQLDate }
    })
})

const AuthType = new GraphQLObjectType({
    name: "Auth",
    fields: () => ({
        id: { type: GraphQLID },
        accessToken: { type: GraphQLString },
        refreshToken: { type: GraphQLString },
        accesstokenExp: { type: GraphQLString },
        refreshtokenExp: { type: GraphQLString }
    })
})

const HotelType = new GraphQLObjectType({
    name: "Hotel",
    fields: () => ({
        id: { type: GraphQLID },
        image: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        totalRooms: { type: GraphQLInt },
        roomsMap: { type: GraphQLJSONObject },
        addedOn: { type: GraphQLDate },
        location: { type: GraphQLString },
        ratings: { type: GraphQLInt },
        manager: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.manager)
            }
        },
        rooms: {
            type: new GraphQLList(RoomType),
            resolve(parent, args) {
                return Room.find({ hotel: parent._id })
            }
        }
    })
})

const RoomType = new GraphQLObjectType({
    name: "Room",
    fields: () => ({
        id: { type: GraphQLID },
        images: { type: new GraphQLList(GraphQLString) },
        images: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "Image",
                fields: () => ({
                    url: { type: GraphQLString },
                    uuid: { type: GraphQLID },
                })
            }))
        },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        addedOn: { type: GraphQLDate },
        ratings: { type: GraphQLInt },
        others: { type: new graphql.GraphQLList(GraphQLString) },
        price: { type: GraphQLInt },
        roomNumbers: { type: new GraphQLList(GraphQLInt) },
        occupancy: { type: GraphQLInt },
        hotel: {
            type: HotelType,
            resolve(parent, args) {
                return Hotel.findById(parent.hotel)
            }
        },
        bookings: {
            type: new GraphQLList(BookingType),
            resolve(parent, args) {
                return Booking.find({ room: parent._id })
            }
        }
    })
})

const BookingType = new GraphQLObjectType({
    name: "Booking",
    fields: () => ({
        id: { type: GraphQLID },
        from: { type: GraphQLDate },
        to: { type: GraphQLDate },
        days: { type: GraphQLInt },
        bookedOn: { type: GraphQLDate },
        people: {
            type: new GraphQLObjectType({
                name: "People",
                fields: () => ({
                    children: { type: GraphQLInt },
                    adults: { type: GraphQLInt },
                })
            })
        },
        roomNumbers: { type: new GraphQLList(GraphQLInt) },
        amount: { type: GraphQLInt },
        paid: { type: GraphQLBoolean },
        numOfPeople: { type: GraphQLInt },
        location: { type: GraphQLString },
        bookedBy: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.bookedBy)
            }
        },
        room: {
            type: RoomType,
            resolve(parent, args) {
                return Room.findById(parent.room)
            }
        },
        hotel: {
            type: HotelType,
            resolve(parent, args) {
                return Hotel.findById(parent.hotel)
            }
        }
    })
})


const PeopleType = new GraphQLInputObjectType({
    name: 'people',
    fields: {
        children: { type: GraphQLInt },
        adults: { type: GraphQLInt },
    }
})

const ImageType = new GraphQLInputObjectType({
    name: 'image',
    fields: {
        url: { type: GraphQLString },
        uuid: { type: GraphQLID },
    }
})


module.exports = {
    AuthType,
    UserType,
    HotelType,
    RoomType,
    BookingType,
    PeopleType,
    ImageType
}
