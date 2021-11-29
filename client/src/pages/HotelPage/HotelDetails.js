import React from 'react'
import styled from 'styled-components'
import { Image, Text } from '../../components/GlobalStyles/PageStyles'
import HotelIMG from "../../assets/hotel.jpeg";

const SmallDetails = styled.div`
    border: 0.5px solid #d8d8d8;
    padding: 16px
`

const HotelDetails = (props) => {
    const {hotel} = props
    return (
        <div>
            <div style={{ display: 'flex', width: '100%' }}>
                <Image style={{ backgroundImage: `url(${HotelIMG})`, height: "300px", width: "60%", }} />
                <SmallDetails style={{width: '40%', marginLeft: '20px'}}>
                    <Text className="small">Location: <span>{hotel.location}</span></Text>
                    {/* <Text className="small">Manager: <span>{hotel.manager.user.name}</span></Text> */}
                    <Text className="small">Ratings: <span>{hotel.ratings}</span></Text>
                    <Text className="small">Price: <spn>1500-5960/-</spn></Text>
                </SmallDetails>
            </div>
            <Text className="clip" style={{marginTop: '20px'}}>{hotel.name}</Text>
            <Text className="clamp small" style={{marginTop: '12px'}}>{hotel.description}</Text>
        </div>
    )
}

export default HotelDetails
