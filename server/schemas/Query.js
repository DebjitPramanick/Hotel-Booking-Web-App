const graphql = require('graphql')
const { login, getUser } = require('./queries/userQueries.js')

const { GraphQLObjectType } = graphql

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        login,
        getUser
    }
})

module.exports = Query