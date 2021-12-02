const graphql = require('graphql')
const { UserType, AuthType } = require("../Type.js")
const User = require("../../models/User.js")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const isAuth = require('../../middlewares/isAuth.js')


const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList
} = graphql


const login = { // For login existing user
    type: UserType,
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parents, args) {
        let query = await User.findOne({ email: args.email })
        if (!query) {
            throw new Error('User does not exist.')
        }
        else {
            let isEqual = await bcrypt.compare(args.password, query.password)
            if (!isEqual) {
                throw new Error('Password is incorrect.')
            }
            else {
                const accessToken = await jwt.sign({ email: query.email }, 'accessToken', {
                    expiresIn: '4h'
                })
                const refreshToken = await jwt.sign({ email: query.email }, 'refreshToken', {
                    expiresIn: '7d'
                })
                return {
                    username: query.username,
                    email: query.email,
                    name: query.name,
                    dob: query.dob,
                    id: query._id,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    accessTokenExp: query.accessTokenExp,
                    refreshTokenExp: query.refreshTokenExp,
                    isAdmin: query.isAdmin,
                    isManager: query.isManager,
                    isBlocked: query.isBlocked,
                    joined: query.joined
                }
            }
        }
    }
}

const getUser = { // For getting user details
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args, req) {
        if (!req.isAuth) {
            throw new Error("Unauthenticated user!")
        }
        else {
            let user = await User.findById(args.id)
            return user
        }
    }
}

const getAllUsers = { // For getting user details
    type: new GraphQLList(UserType),
    async resolve(parent, args, req) {
        let users = await User.find({ "isManager": false })
        return users
    }
}

module.exports = {
    login,
    getUser,
    getAllUsers
}