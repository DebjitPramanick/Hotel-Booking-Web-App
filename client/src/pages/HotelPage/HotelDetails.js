import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Image, Text } from '../../components/GlobalStyles/PageStyles'
import HotelIMG from "../../assets/hotel.png";
import RoomDetails from './RoomDetails';
import { GlobalContext } from '../../utils/Context';

const Details = styled.div`
    border: 0.5px solid #d8d8d8;
    padding: 16px
`

const HotelDetails = (props) => {

    const { hotel, params } = props
    const ratings = !hotel.ratings ? 0.00 : hotel.ratings

    return (
        <div>
            <div style={{ display: 'flex', width: '100%' }}>
                <Image style={{ backgroundImage: `url(${hotel.image ? hotel.image : HotelIMG})`, height: "300px", width: "60%", }} />
                <Details style={{ width: '40%', marginLeft: '20px' }}>
                    <Text className="small">Location: <span>{hotel.location}</span></Text>
                    <Text className="small">Ratings: <span className="highlight">{ratings}</span></Text>
                    <Text className="small">Price: <span>1500-5960/-</span></Text>
                </Details>
            </div>
            <Details style={{marginTop: '20px'}}>
                <Text className="clip">{hotel.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.description}</Text>
            </Details>
            <Details style={{marginTop: '20px'}}>
                <Text className="clip">Manager Details</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.manager.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>
                    Contact: <span>{hotel.manager.email}</span>
                </Text>
            </Details>
            <Text style={{marginTop: '20px'}}>Rooms</Text>
            <div style={{marginTop: '20px'}}>
                {hotel.rooms.map(r => (
                    <RoomDetails room={r} params={params}/>
                ))}
            </div>
        </div>
    )
}

export default HotelDetails
