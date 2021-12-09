import React from 'react'
import styled from 'styled-components'
import { FormButton, Image, SelectBox, Text } from '../../components/GlobalStyles/PageStyles'
import RoomIMG from "../../assets/hotel.png";
import { useNavigate } from 'react-router-dom'

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

    const { room, params } = props
    const ratings = !room.ratings ? 0.00 : room.ratings
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const handleBook = () => {
        const bookingData = {
            from: params.from,
            to: params.to,
            roomNumber: 103,
            bookedBy: user.id,
            paid: false,
            amount: room.price,
            people: params.people,
            room: room.id,
            hotel: room.hotel.id
        }
        navigate(`/payment/${room.hotel.id}/${room.id}/1`, {state: bookingData})
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
                    <FormButton onClick={handleBook}
                    style={{display: 'initial', marginRight: '16px'}}>
                        Book Room
                    </FormButton>
                    <SelectBox name="cars" id="cars">
                        {room.roomNumbers.map((r,i) => (
                            <option value={i+1}>{`${i === 0 ? '1 Room' : `${i+1} Rooms`} `}</option>
                        ))}
                    </SelectBox>
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
