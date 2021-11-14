const graphql = require('graphql')
const { getBooking, getAllBookings } = require('./queries/bookingQueries.js')
const { getHotel, getAllHotels } = require('./queries/hotelQueries.js')
const { getRoom, getAllRooms } = require('./queries/roomQueries.js')
const { login, getUser, getAllUsers } = require('./queries/userQueries.js')

const { GraphQLObjectType } = graphql

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        login,
        getUser,
        getAllUsers,
        getHotel,
        getAllHotels,
        getRoom,
        getAllRooms,
        getBooking,
        getAllBookings
    }
})

module.exports = Query