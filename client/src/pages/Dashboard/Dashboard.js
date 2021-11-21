import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../utils/Context'
import RoomsList from './RoomsList'
import HotelIMG from "../../assets/hotel.jpeg"

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
    .overlay{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #00000066;
    }
`
const Controls = styled.div`
    width: 100%;
    position: absolute;
    padding: 20px;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff
`

const Graph = styled.div`
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    background: grey;
    margin-left: 10px;
    max-width: -webkit-fill-available;
`

const Dashboard = () => {
    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Dashboard")
    }, [])

    return (
        <div>
            <QuickView>
                <Info style={{backgroundImage: `url(${HotelIMG})`, textAlign: 'center'}}>
                    <div className="overlay"></div>
                    <Controls>
                        <p>Create Room</p>
                        <p>Update Room</p>
                        <p>Update Hotel</p>
                    </Controls>
                </Info>
                <Graph />
            </QuickView>
            <RoomsList />
        </div>
    )
}

export default Dashboard
