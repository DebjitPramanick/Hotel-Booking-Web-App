import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../utils/Context'
import RoomsList from './RoomsList'
import HotelIMG from "../../assets/hotel.jpeg"
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import "./dashboard.css"

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

    useEffect(() => {
        setPage("Dashboard")
    }, [])

    const controls = [
        { label: 'Create Room', icon: <AddIcon /> },
        { label: 'Edit Room', icon: <EditIcon /> },
        { label: 'Edit Hotel', icon: <EditIcon /> }
    ]

    return (
        <div>
            <QuickView>
                <Info style={{ backgroundImage: `url(${HotelIMG})` }}>
                    <div className="card-details">
                        <h1>Hotel Name</h1>
                        <p>Location</p>
                        <p className="description">
                            Lorem Ipsum is simply dummy text of the printing 
                            and typesetting industry. Lorem Ipsum has been 
                            the industry's standard dummy text ever since 
                            the 1500s, when an unknown printer took a galley 
                            of type and scrambled it to make a type specimen 
                            book.
                        </p>
                        <CardText>Total Rooms : <span>56</span></CardText>
                        <CardText>Added on : <span>21st November, 2021</span></CardText>
                        <CardText>Manager: <span>Debjit Pramanick</span></CardText>
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
            <RoomsList />
        </div>
    )
}

export default Dashboard
