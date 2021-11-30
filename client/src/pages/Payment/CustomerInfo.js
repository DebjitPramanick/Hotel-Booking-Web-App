import React from 'react'
import { FormButton, Text } from '../../components/GlobalStyles/PageStyles'
import styled from 'styled-components'

const Layout = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 80px auto 10px auto;
    border: 0.5px solid #d8d8d8;
    &.buttons{
        justify-content: space-between;
        border: 0;
        margin-top: 10px;
        @media(max-width: 576px){
            flex-direction: row;
        }
    }
    .section{
        margin: 16px;
        :first-child{
            flex-basis: 60%;
            border-right: 0.5px solid #d8d8d8;
            @media(max-width: 576px){
                border-right: 0
            }
        }
        :last-child{
            flex-basis: 40%
        }
    }
    @media(max-width: 576px){
        flex-direction: column;
        button{
            width: fit-content;
            margin-bottom: 16px;
        }
    }
`

const CustomerInfo = (props) => {
    const { user, room, hotel } = props
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
                        Age: <span>{user.age}</span>
                    </Text>
                    <Text className="small">
                        Total: <span>5 People</span>
                    </Text>
                </div>
                <div className="section">
                    <Text>Booking Info</Text>
                    {/* <Text className="small">
                        Hotel: <span>{hotel.name}</span>
                    </Text> */}
                    <Text className="small">
                        Room: <span>{room.name}</span>
                    </Text>
                    <Text className="small" style={{ margin: '-10px 0 10px 0' }}>
                        Room Number(s): {[1, 2, 3].map(r =>
                            (<span className="highlight" style={{ margin: '4px 2px' }}>{r}</span>)
                        )}
                    </Text>
                    <Text className="small">
                        Price (Each room): <span>Rs. {room.price}</span>
                    </Text>
                    <Text className="small">
                        Total cost: <span>Rs. {room.price * 3}</span>
                    </Text>
                </div>
            </Layout>
            <Layout className="buttons">
                <FormButton>Go Back</FormButton>
                <FormButton>Confirm</FormButton>
            </Layout>
        </>
    )
}

export default CustomerInfo
