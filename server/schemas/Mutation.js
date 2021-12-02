const graphql = require('graphql')
const { createUser, generateToken, makeManager, updateProfile, deleteAccount, blockUser } = require('./mutations/userMutations.js')
const { addHotel, deleteHotel, updateHotel } = require('./mutations/hotelMutations.js')
const { addRoom, deleteRoom } = require('./mutations/roomMutations.js')
const { addBooking, cancelBooking } = require('./mutations/bookingMutation.js')

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
        deleteRoom,
        addBooking,
        cancelBooking
    }
})

module.exports = Mutation