import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../utils/Context'
import RoomsList from './RoomsList'
import HotelIMG from "../../assets/hotel.jpeg"
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import "./dashboard.css"
import { useQuery } from '@apollo/client'
import { GET_HOTEL } from '../../graphql/queries'
import { getDate } from '../../utils/utilFunctions'

const QuickView = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 360px
`
const Info = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: grey;
    margin-right: 10px;
    max-width: -webkit-fill-available;
    position: relative;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    .card-details{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #00000066;
        padding: 16px;
    }
`
const Controls = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    text-align: center;
    .card-option{
        background: #0000009c;
        width: 100%;
        padding: 10px;
        cursor: pointer;
        :hover{
            background: #383838
        }
    }
`

const Graph = styled.div`
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    background: grey;
    margin-left: 10px;
    max-width: -webkit-fill-available;
`

const CardText = styled.div`
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 10px;
    white-space: nowrap;
    span{
        font-weight: bold
    }
`

const Dashboard = () => {
    const { setPage } = useContext(GlobalContext)
    const user = JSON.parse(localStorage.getItem('user'))

    const { loading, data, error } = useQuery(GET_HOTEL, {
        variables: { id: user.id },
    })

    console.log(data)

    useEffect(() => {
        setPage("Dashboard")
    }, [])

    const controls = [
        { label: 'Create Room', icon: <AddIcon /> },
        { label: 'Edit Hotel', icon: <EditIcon /> }
    ]

    if(loading) return <p>Loading...</p>

    const hotel = data.getHotel

    return (
        <div>
            <QuickView>
                <Info style={{ backgroundImage: `url(${HotelIMG})` }}>
                    <div className="card-details">
                        <h1>{hotel.name}</h1>
                        <p>{hotel.location}</p>
                        <p className="description">
                            {hotel.description}
                        </p>
                        <CardText>Total Rooms : <span>{hotel.totalRooms}</span></CardText>
                        <CardText>Added on : <span>{getDate(hotel.addedOn, 'Do MMMM, YYYY')}</span></CardText>
                        <CardText>Manager: <span>{hotel.manager.name}</span></CardText>
                    </div>
                    <Controls>
                        {controls.map(c => (
                            <div className="card-option">
                                {c.icon}
                                <p>{c.label}</p>
                            </div>
                        ))}
                    </Controls>
                </Info>
                <Graph />
            </QuickView>
            <RoomsList rooms={hotel.rooms}/>
        </div>
    )
}

export default Dashboard
