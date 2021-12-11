const graphql = require('graphql')
const { createUser, generateToken, makeManager, updateProfile, deleteAccount, blockUser } = require('./mutations/userMutations.js')
const { addHotel, deleteHotel, updateHotel } = require('./mutations/hotelMutations.js')
const { addRoom, deleteRoom, updateRoom } = require('./mutations/roomMutations.js')
const { addBooking, addBookingWithPayment, cancelBooking } = require('./mutations/bookingMutation.js')

const { GraphQLObjectType } = graphql

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser,
        generateToken,
        makeManager,
        updateProfile,
        deleteAccount,
        blockUser,
        addHotel,
        updateHotel,
        deleteHotel,
        addRoom,
        updateRoom,
        deleteRoom,
        addBooking,
        addBookingWithPayment,
        cancelBooking
    }
})

module.exports = Mutation