const graphql = require('graphql')
const { login, getUser, getAllUsers } = require('./queries/userQueries.js')

const { GraphQLObjectType } = graphql

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        login,
        getUser,
        getAllUsers
    }
})

module.exports = Query