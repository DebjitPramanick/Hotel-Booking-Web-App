const graphql = require('graphql')
const { createUser, generateToken, makeManager, updateProfile, deleteAccount, blockUser } = require('./mutations/userMutations.js')
const { addHotel, deleteHotel } = require('./mutations/hotelMutations.js')
const { addRoom } = require('./mutations/roomMutations.js')

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
        deleteHotel,
        addRoom
    }
})

module.exports = Mutation