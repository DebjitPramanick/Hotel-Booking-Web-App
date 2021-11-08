const graphql = require('graphql')

const  {GraphQLID, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLBoolean,
    GraphQLObjectType
} = graphql


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        name: {type: GraphQLString},
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        age: { type: GraphQLInt },
        accessToken: { type: GraphQLString },
        refreshToken: { type: GraphQLString },
        accessTokenExp: { type: GraphQLString },
        refreshTokenExp: { type: GraphQLString },
        isManager: { type: GraphQLBoolean },
        isAdmin: { type: GraphQLBoolean }
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

module.exports = {
    AuthType,
    UserType
}
