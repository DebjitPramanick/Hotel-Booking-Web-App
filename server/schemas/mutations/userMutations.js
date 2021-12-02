const graphql = require('graphql')
const { UserType, AuthType } = require("../Type.js")
const bcrypt = require('bcryptjs')
const User = require("../../models/User.js")
const verifyToken = require('../../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken')
const GraphQLDate = require('graphql-date')

const { GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType
} = graphql


const createUser = { // For creating new user
    type: UserType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        dob: { type: new GraphQLNonNull(GraphQLDate) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
        let query = await User.findOne({ email: args.email })
        if (query) {
            throw new Error('User already exists.')
        }
        else {
            let passHash = await bcrypt.hash(args.password, 12)

            const accessToken = await jwt.sign({ email: args.email }, 'accessToken', {
                expiresIn: '4h'
            })
            const refreshToken = await jwt.sign({ email: args.email }, 'refreshToken', {
                expiresIn: '7d'
            })

            let user = new User({
                username: args.username,
                name: args.name,
                email: args.email,
                password: passHash,
                dob: args.dob,
                accessToken: accessToken,
                refreshToken: refreshToken,
                accessTokenExp: '4h',
                refreshTokenExp: '7d'
            })
            let res = await user.save()
            return res
        }
    }
}

const generateToken = { // For generating new access token
    type: UserType,
    args: {
        refreshToken: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
        if (!args.refreshToken) {
            throw new Error("Not a refresh token.")
        }
        else {
            let userEmail = await verifyToken(args.refreshToken)
            let user = await User.findOne({ email: userEmail })
            const accessToken = await jwt.sign({ email: user.email }, 'accessToken', {
                expiresIn: '4h'
            })
            const refreshToken = await jwt.sign({ email: user.email }, 'refreshToken', {
                expiresIn: '7d'
            })
            return {
                username: user.username,
                email: user.email,
                dob: user.dob,
                name: user.name,
                id: user._id,
                accessToken: accessToken,
                refreshToken: refreshToken,
                accessTokenExp: user.accessTokenExp,
                refreshTokenExp: user.refreshTokenExp,
                isAdmin: user.isAdmin,
                isManager: user.isManager,
                isBlocked: user.isBlocked,
                joined: user.joined
            }
        }
    }
}

const updateProfile = { // For updating user profile
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        dob: { type: new GraphQLNonNull(GraphQLDate) }
    },
    async resolve(parent, args) {
        if (!args.id) throw new Error("ID is not given.");

        let user = await User.findByIdAndUpdate(args.id, {
            id: args.id,
            name: args.name,
            email: args.email,
            dob: args.dob
        },{ new: true })

        return user
    }
}

const deleteAccount = { // For deleting user account
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
        if (!args.id) throw new Error("ID is not given.");

        let res = await User.findByIdAndRemove(args.id).exec()
        return res
    }
}

const makeManager = { // For making an user manager
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
        if (!args.id) {
            throw new Error("ID is not given.")
        }
        else {
            let user = await User.findByIdAndUpdate(args.id, {
                isManager: true
            }, { new: true })
            return user
        }
    }
}

const blockUser = { // For block user or manager
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
        if (!args.id) {
            throw new Error("ID is not given.")
        }
        else {
            let user = await User.findByIdAndUpdate(args.id, {
                isBlocked: true
            }, { new: true })
            return user
        }
    }
}


module.exports = {
    createUser,
    generateToken,
    updateProfile,
    deleteAccount,
    makeManager,
    blockUser,
}