import React from 'react'
import { FormButton, Text } from '../../components/GlobalStyles/PageStyles'
import styled from 'styled-components'
import { getAge } from '../../utils/utilFunctions'
import { useNavigate } from 'react-router-dom'
import { Layout } from './CommonStyles'


const CustomerInfo = (props) => {
    const { user, room, booking } = props
    const navigate = useNavigate()

    console.log(props)

    return (
        <>
            <Layout>
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
                        Total: <span>{booking.people.adults+booking.people.children} Persons</span>
                    </Text>
                </div>
                <div className="section">
                    <Text>Booking Info</Text>
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
            </Layout>
            <Layout className="buttons">
                <FormButton onClick={() => navigate(`/hotel/${room.hotel.id}`, {state: booking})}>
                    Go Back
                </FormButton>
                <FormButton onClick={() => navigate(`/payment/${room.hotel.id}/${room.id}/2`, {state: booking})}>
                    Confirm
                </FormButton>
            </Layout>
        </>
    )
}

export default CustomerInfo
