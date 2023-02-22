import React from 'react'
import styled from 'styled-components'
import { Image, Text } from '../../components/GlobalStyles/PageStyles'
import HotelIMG from "../../assets/hotel.png";
import RoomDetails from './RoomDetails';
import { useQuery } from '@apollo/client';
import { GET_AVAILABLE_ROOMS } from '../../graphql/queries/roomQueries';
import PageLoader from "../../components/Loaders/PageLoader"
import ComponentError from '../../components/Error/ComponentError';

const Details = styled.div`
    border: 0.5px solid #d8d8d8;
    padding: 16px
`

const Flex = styled.div`

    display: flex;
    width: 100%;

    @media(max-width: 600px) {
        flex-direction: column
    }

    .img-container {
        @media(max-width: 600px) {
            width: 100% !important;
            margin: 0 0 16px 0;

        }
    }

    .details {
        border: 0.5px solid #d8d8d8;
        padding: 16px;

        @media(max-width: 600px) {
            width: 100% !important;
            margin: 0 0 16px 0 !important;

        }
    }
`

export const ManagerView = (props) => {
    const { hotel, params } = props
    const ratings = !hotel.ratings ? 0.00 : hotel.ratings

    const rooms = hotel.rooms

    const getPriceRange = () => {
        if (hotel.rooms.length === 0) return "Price - N/A"
        let prices = hotel.rooms.map(room => room.price)
        let maxPrice = Math.max(...prices)
        let minPrice = Math.min(...prices)

        if (maxPrice === minPrice) return `${maxPrice}/-`;
        return `${minPrice} - ${maxPrice}/-`;
    }

    return (
        <div>
            <Flex>
                <Image style={{ backgroundImage: `url(${hotel.image ? hotel.image : HotelIMG})`, height: "300px", width: "60%", }} className="img-container" />
                <div className='details' style={{ width: '40%', marginLeft: '20px' }}>
                    <Text className="small">Location: <span>{hotel.location}</span></Text>
                    <Text className="small">Price: <span>{getPriceRange()}</span></Text>
                </div>
            </Flex>
            <Details style={{ marginTop: '20px' }}>
                <Text className="clip">{hotel.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.description}</Text>
            </Details>
            <Details style={{ marginTop: '20px' }}>
                <Text className="clip">Manager Details</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.manager.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>
                    Contact: <span>{hotel.manager.email}</span>
                </Text>
            </Details>
            <Text style={{ marginTop: '20px' }}>Rooms</Text>
            <div style={{ marginTop: '20px' }}>
                {rooms.map(r => (
                    <RoomDetails room={r}
                        roomNumbers={[]}
                        params={params} />
                ))}
            </div>
        </div>
    )
}


export const HotelDetails = (props) => {

    const { hotel, params } = props
    let total = Object.values(params.people).reduce((a, b) => a + b)

    const { data, loading, error } = useQuery(GET_AVAILABLE_ROOMS, {
        variables: {
            hotelId: hotel.id,
            from: params.from,
            to: params.to,
            occupancy: total
        }
    })
    // const ratings = !hotel.ratings ? 0.00 : hotel.ratings

    const getPriceRange = () => {
        if (hotel.rooms.length === 0) return "Price - N/A"
        let prices = hotel.rooms.map(room => room.price)
        let maxPrice = Math.max(...prices)
        let minPrice = Math.min(...prices)

        if (maxPrice === minPrice) return `${maxPrice}/-`;
        return `${minPrice} - ${maxPrice}/-`;
    }

    if (loading) return <PageLoader />
    if (error) return <ComponentError error={error} />

    const rooms = data.getAvailableRooms;

    return (
        <div>
            <Flex>
                <Image style={{ backgroundImage: `url(${hotel.image ? hotel.image : HotelIMG})`, height: "300px", width: "60%", }} className="img-container" />
                <div className='details' style={{ width: '40%', marginLeft: '20px' }}>
                    <Text className="small">Location: <span>{hotel.location}</span></Text>
                    <Text className="small">Price: <span>{getPriceRange()}</span></Text>
                </div>
            </Flex>
            <Details style={{ marginTop: '20px' }}>
                <Text className="clip">{hotel.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.description}</Text>
            </Details>
            <Details style={{ marginTop: '20px' }}>
                <Text className="clip">Manager Details</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>{hotel.manager.name}</Text>
                <Text className="clamp small" style={{ marginTop: '12px' }}>
                    Contact: <span>{hotel.manager.email}</span>
                </Text>
            </Details>
            <Text style={{ marginTop: '20px' }}>Rooms</Text>
            <div style={{ marginTop: '20px' }}>
                {rooms.map(r => (
                    <RoomDetails room={r.room}
                        roomNumbers={r.roomNumbers}
                        params={params} />
                ))}
            </div>
        </div>
    )
}