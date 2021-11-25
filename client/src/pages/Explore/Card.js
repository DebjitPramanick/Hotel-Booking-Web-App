import React from 'react'
import styled from 'styled-components'
import HotelIMG from "../../assets/hotel.jpeg"
import { FormButton, Image } from '../../components/GlobalStyles/PageStyles'
import "./card.css"
import {useNavigate} from 'react-router-dom'

const CardContainer = styled.div`
    height: 292px;
    padding: 16px;
    border-radius: 6px;
    background: white;
    box-shadow: 0 0 10px #bbbbbb;
    margin-bottom: 20px;
    display: flex;
    position: relative;
    cursor: pointer;
    :hover .slider{
        width: 280px;
        padding: 10px;
        border-radius: 6px;
    }
    :hover .details{
        width: calc(100% - 526px);
    }
`

const HotelDetails = styled.div`
    padding: 0 16px;
    border-radius: 6px;
    margin-bottom: 20px;
    transition: 0.5s;
`

const Text = styled.p`
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 18px;
    &.small{
        font-size: 16px;
        font-weight: normal;
    }
    &.clip{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &.clamp{
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
        color: grey
    }
    span{
        background: #019a01;
        border-radius: 18px;
        padding: 4px 10px;
        color: white
    }
`

const Card = (props) => {


    const navigate = useNavigate()

    return (
        <CardContainer>
            <div className="slider" onClick={() => navigate('/hotel/1')}>
                Book Room
            </div>
            <Image style={{ backgroundImage: `url(${HotelIMG})`, minWidth: '260px', height: '260px' }} />
            <HotelDetails className="details">
                <Text className="clip">Hotel Name</Text>
                <Text className="small">Location</Text>
                <Text className="small clamp">
                    Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived
                    not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised
                    in the 1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing software 
                    like Aldus PageMaker including versions of Lorem Ipsum
                </Text>
                <Text className="small"> <span>5.0</span> Ratings</Text>
                <Text className="small">Starting from Rs. 1151</Text>
                <Text className="small">10 Rooms Available</Text>
            </HotelDetails>
        </CardContainer>
    )
}

export default Card
