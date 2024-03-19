import React, { useState } from 'react'
import { FormButton, Text } from '../../components/GlobalStyles/PageStyles'
import { getAge } from '../../utils/utilFunctions'
import { useNavigate } from 'react-router-dom'
import { Layout } from './CommonStyles'
import { useMutation } from '@apollo/client'
import { ADD_BOOKING } from '../../graphql/mutations/bookingMutation'
import { toast } from 'react-toastify'
import Loader from "../../components/Loaders/Loader"
import StripeCheckout from 'react-stripe-checkout';
import { MAKE_PAYMENT } from '../../graphql/mutations/paymentMutation'

const PaymentScreen = (props) => {
    const { user, room, booking, bookingExists } = props
    const navigate = useNavigate()
    const [addBooking] = useMutation(ADD_BOOKING)
    const [payAmount] = useMutation(MAKE_PAYMENT)

    const [loading, setLoading] = useState(false)
    
    const handleBook = () => {
        setLoading(true)
        if (bookingExists) {
            navigate(`/bookings`)
            return
        }
        addBooking({
            variables: {
                from: booking.from,
                to: booking.to,
                roomNumbers: booking.roomNumbers,
                bookedBy: booking.bookedBy,
                paid: booking.paid,
                amount: booking.amount + 20,
                people: booking.people,
                room: booking.room,
                hotel: booking.hotel
            }
        }).then(res => {
            let newBooking = booking
            newBooking['id'] = res.data.addBooking.id
            navigate(`/payment/${room.hotel.id}/${room.id}/3`, { state: newBooking })
        })
            .catch(err => {
                setLoading(false)
                toast.error(err, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
            })
    }

    const onToken = (token) => {
        setLoading(true)
        if (bookingExists) {
            payAmount({
                variables: {
                    tokenId: token.id,
                    bookingId: booking.id,
                    bookedBy: booking.bookedBy.id
                }
            }).then(res => {
                setLoading(false)
                let newBooking = booking
                newBooking['id'] = res.data.payAmount.id
                newBooking['paid'] = true
                navigate(`/payment/${room.hotel.id}/${room.id}/3`, { state: newBooking })
            }).catch(err => {
                setLoading(false)
                toast.error(err.message, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
            })
        }
        else {
            addBooking({
                variables: {
                    from: booking.from,
                    to: booking.to,
                    roomNumbers: booking.roomNumbers,
                    bookedBy: booking.bookedBy,
                    paid: booking.paid,
                    amount: booking.amount + 20,
                    people: booking.people,
                    room: booking.room,
                    hotel: booking.hotel
                }
            }).then(res => {
                payAmount({
                    variables: {
                        tokenId: token.id,
                        bookingId: res.data.addBooking.id,
                        bookedBy: booking.bookedBy
                    }
                }).then(res => {
                    setLoading(false)
                    let newBooking = booking
                    newBooking['id'] = res.data.payAmount.id
                    newBooking['paid'] = true
                    navigate(`/payment/${room.hotel.id}/${room.id}/3`, { state: newBooking })
                }).catch(err => {
                    setLoading(false)
                    toast.error(err.message, {
                        autoClose: 5500,
                        pauseOnHover: true
                    })
                })
            })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message, {
                        autoClose: 5500,
                        pauseOnHover: true
                    })
                })
        }
    }


    return (
        <>
            <Layout>
                {!loading ? (
                    <>
                        <div className="section">
                            <Text>Customer Info</Text>
                            <Text className="small">
                                Name: <span>{user.name}</span>
                            </Text>
                            <Text className="small">
                                Email: <span>{user.email}</span>
                            </Text>
                            <Text className="small">
                                Age: <span>{getAge(user.dob)}</span>
                            </Text>
                            <Text className="small">
                                Total: <span>{booking.people.adults + booking.people.children}</span>
                            </Text>
                            <Text style={{ marginTop: '20px' }}>Booking Info</Text>
                            <Text className="small">
                                Hotel: <span>{room.hotel.name}</span>
                            </Text>
                            <Text className="small">
                                Room: <span>{room.name}</span>
                            </Text>
                            <Text className="small" style={{ margin: '-10px 0 10px 0' }}>
                                Room Number(s):
                                {booking.roomNumbers.map(r =>
                                    (<span className="highlight" style={{ margin: '4px 2px' }}>{r}</span>)
                                )}
                            </Text>
                            <Text className="small">
                                Price (Each room): <span>Rs. {room.price}</span>
                            </Text>
                            <Text className="small">
                                Total Cost: <span>Rs. {booking.amount}</span>
                            </Text>
                        </div>
                        <div className="section">
                            <Text>Payment Info</Text>
                            <Text className="small">
                                Room(s) Cost: <span>Rs. {booking.amount}</span>
                            </Text>
                            <Text className="small">
                                Tax: <span>Rs. {20}</span>
                            </Text>
                            <Text className="small">
                                Total Cost: 
                                <span>Rs. {booking.amount + 20}</span>
                            </Text>
                            <StripeCheckout
                                token={onToken}
                                stripeKey="pk_test_51Hr13fE7BvSkBO4prE35EeVzyGVKfQCPfpfcOZZkSLfa4jfONQeEOrd9A4wFIERlRXuVpBu3NYVm1YwCrFfY0gs400dAaCrTp0"
                                name=""
                                currency='USD'
                                amount={(booking.amount + 20) * 100}
                            />
                            <Text className="small" style={{ marginTop: '16px', color: 'grey' }}>
                                *You can also pay later
                            </Text>
                        </div>
                    </>
                ) : <Loader />}

            </Layout>
            <Layout className="buttons">
                <FormButton onClick={() => navigate(`/payment/${room.hotel.id}/${room.id}/1`, { state: booking })}>
                    Go Back
                </FormButton>
                <FormButton onClick={() => handleBook()} disabled={loading}>
                    Pay Later
                </FormButton>
            </Layout>
        </>
    )
}

export default PaymentScreen
