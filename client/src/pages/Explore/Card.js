import React from 'react'
import styled from 'styled-components'
import HotelIMG from "../../assets/hotel.png"
import { FormButton, Image, Text } from '../../components/GlobalStyles/PageStyles'
import "./card.css"
import { useNavigate } from 'react-router-dom'

const CardContainer = styled.div`
    padding: 16px;
    border-radius: 6px;
    background: white;
    box-shadow: 0 0 10px #bbbbbb;
    margin-bottom: 20px;
    display: flex;
    position: relative;
    cursor: pointer;
    :hover .action-slider{
        width: 280px;
        padding: 10px;
        border-radius: 6px;
    }

    @media(max-width: 600px) {
        flex-direction: column
    }
`

const HotelDetails = styled.div`
    padding: 0 16px;
    border-radius: 6px;
    transition: 0.5s;
    width: 100%;

    @media(max-width: 600px) {
        margin-top: 16px;
        padding: 0;
    }
`

const Card = (props) => {
    const navigate = useNavigate()
    const { data, params } = props
    const hotel = data.hotel

    console.log(data)

    const searchData = {
        from: params.from,
        to: params.to,
        people: params.people,
    }

    const getStartingPrice = () => {
        if (hotel.rooms.length === 0) return "Starting Price - N/A"
        let prices = hotel.rooms.map(room => room.price)
        let minPrice = Math.min(...prices)
        return `Starting from Rs. ${minPrice}`;
    }

    const getAvlRoomCount = () => {
        if (hotel.rooms.length === 0) return "No room is available right now";
        let roomsCount = hotel.rooms.map(room => room.roomNumbers.length).reduce((cur, res) => cur + res)
        return roomsCount
    }

    return (
        <CardContainer>
            <Image style={{ backgroundImage: `url(${hotel.image ? hotel.image : HotelIMG})`, minWidth: '260px', height: '260px' }}
                className="img-container" />
            <HotelDetails className="details">
                <Text className="clip">{hotel.name}</Text>
                <Text className="small">{hotel.location}</Text>
                <Text className="small clamp">{hotel.description}</Text>
                <Text className="small clamp">{getStartingPrice()}</Text>
                <Text className="small" style={{ marginBottom: 0 }}>{getAvlRoomCount()} Rooms Available</Text>
                <FormButton
                    style={{
                        width: '100%',
                        marginTop: '16px'
                    }}
                    onClick={() => navigate(`/hotel/${hotel.id}`, { state: searchData })}>Book Room</FormButton>
            </HotelDetails>
        </CardContainer>
    )
}

export default Card
