const graphql = require('graphql')
const { UserType, AuthType, HotelType, BookingType, PeopleType } = require("../Type.js")
const User = require("../../models/User.js")
const Booking = require("../../models/Booking.js")
const Stripe = require('stripe');
const dotenv = require('dotenv')

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SK);

const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
} = graphql

const payAmount = { // For payment
    type: BookingType,
    args: {
        tokenId: { type: new GraphQLNonNull(GraphQLID) },
        bookingId: { type: new GraphQLNonNull(GraphQLID) },
        bookedBy: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
        if (!args.tokenId) throw new Error("Token ID is not given.");
        const booking = await Booking.findById(args.bookingId)
        const user = await User.findById(args.bookedBy)

        if (!user || !booking) throw new Error("No booking or user found.");

        const customer = await stripe.customers.create({
            email: user.email,
            source: args.tokenId
        }).catch(e => {
            throw new Error("Payment failed.");
        })

        const charge = await stripe.charges.create({
            amount: booking.amount * 100,
            currency: 'INR',
            customer: customer.id,
            receipt_email: user.email,
            description: "Transaction",
        }, { idempotencyKey: Math.round(Math.random() * 10000) })
            .catch(e => {
                throw new Error("Payment failed.");
            })

        if (charge) {
            let res = await Booking.findByIdAndUpdate(args.bookingId,
                {
                    from: booking.from,
                    to: booking.to,
                    days: booking.days,
                    roomNumber: booking.roomNumber,
                    amount: booking.amount,
                    numOfPeople: booking.numOfPeople,
                    location: booking.location,
                    bookedBy: booking.bookedBy,
                    people: booking.people,
                    room: booking.room,
                    hotel: booking.hotel,
                    paid: true
                }, { new: true })
            return res
        }
        else throw new Error("Payment failed.")
    }
}

module.exports = {
    payAmount
}