const graphql = require('graphql')
const { createUser, generateToken, makeManager, updateProfile, deleteAccount, blockUser } = require('./mutations/userMutations.js')
const { addHotel } = require('./mutations/hotelMutations.js')

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
        addHotel
    }
})

module.exports = Mutation