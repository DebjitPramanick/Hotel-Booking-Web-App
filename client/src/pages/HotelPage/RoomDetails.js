import React from 'react'
import styled from 'styled-components'
import { FormButton, Image, Text } from '../../components/GlobalStyles/PageStyles'
import RoomIMG from "../../assets/hotel.png";
import {useNavigate} from 'react-router-dom'

const CardContainer = styled.div`
    margin-top: 20px;
    background: #ffeedb;
    padding: 16px;
    border-radius: 6px;
`

const Details = styled.div`
    width: 40%;
    margin-left: 20px
`

const Features = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    align-items: center;
    grid-gap: 8px;
    p{
        text-align: center;
        padding: 6px 10px;
        border: 1px solid #cbcbcb;
        border-radius: 20px;
        margin: 0
    }
}
`

const RoomDetails = (props) => {

    const { room } = props
    const ratings = !room.ratings ? 0.00 : room.ratings
    const navigate = useNavigate()

    const handleBook = () => {
        navigate(`/payment/${room.hotel.id}/${room.id}/1`)
    }

    return (
        <CardContainer style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <Image style={{ backgroundImage: `url(${RoomIMG})`, height: "300px", width: "60%", }} />
                <Details style={{ width: '40%', marginLeft: '20px' }}>
                    <Text className="clip">{room.name}</Text>
                    <Text className="clamp small" style={{ marginTop: '12px' }}>{room.description}</Text>
                    <Text className="small">Ratings: <span className="highlight">{ratings}</span></Text>
                    <Text className="small">Price: <span>{room.price}/-</span></Text>
                    <FormButton onClick={handleBook}>Book Room</FormButton>
                </Details>
            </div>
            <Features>
                {room.others.map(oth => (
                    <Text className="small">{oth}</Text>
                ))}
            </Features>

        </CardContainer>
    )
}

export default RoomDetails
