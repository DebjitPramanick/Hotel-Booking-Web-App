const graphql = require('graphql')
const Query = require('./Query.js')
const Mutation = require('./Mutation.js')

const {GraphQLSchema} = graphql

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})