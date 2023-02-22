import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../utils/Context'
import RoomsList from './RoomsList'
import HotelIMG from "../../assets/hotel.png"
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import "./dashboard.css"
import { useQuery } from '@apollo/client'
import { getDate } from '../../utils/utilFunctions'
import RoomModal from '../../components/Modals/RoomModal'
import { GET_HOTEL } from '../../graphql/queries/hotelQueries'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import HotelModal from '../../components/Modals/HotelModal'
import PageLoader from '../../components/Loaders/PageLoader'
import PageError from '../../components/Error/PageError'
import ViewBookings from '../../components/Modals/ViewBookings'
import QuickStat from './Stats/QuickStat'

const QuickView = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 360px;
    gap: 16px;

    @media(max-width: 1000px){
        display: block;
        height: fit-content
    }
`
const Info = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: grey;
    max-width: -webkit-fill-available;
    position: relative;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    margin-bottom: 16px;
    .card-details{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #00000066;
        padding: 16px;
    }

    @media(max-width: 1000px){
        height: 360px;
        margin: 0
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

const StatContainer = styled.div`
    width: 100%;
    border-radius: 20px;
    max-width: -webkit-fill-available;
    margin-bottom: 20px;
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
        variables: { id: user?.id },
    })

    const [roomModal, setRoomModal] = useState({
        state: false,
        title: '',
        param: null,
        action: ''
    })

    const [hotelModal, setHotelModal] = useState({
        state: false,
        title: '',
        param: null,
        action: ''
    })

    const [bookingsModal, setBookingsModal] = useState({
        state: false,
        title: '',
        param: null,
        action: ''
    })

    useEffect(() => {
        setPage("Dashboard")
    }, [])

    const controls = [
        {
            label: 'Create Room', icon: <AddIcon />, action: () =>
                setRoomModal({ state: true, title: 'Add New Room', params: null, action: 'add' })
        },
        {
            label: 'Edit Hotel', icon: <EditIcon />, action: () =>
                setHotelModal({ state: true, title: 'Update Hotel Details', params: null, action: 'update' })
        }
    ]

    if (loading) return <PageLoader />
    if (error) return <PageError error={error} />

    const hotel = data.getHotel

    return (
        <PageContainer>

            {roomModal.state && (<RoomModal
                action={roomModal.action} title={roomModal.title} hotel={hotel} room={roomModal.param}
                setRoomModal={setRoomModal} />)}

            {hotelModal.state && (<HotelModal
                action={hotelModal.action} title={hotelModal.title} hotel={hotel}
                setHotelModal={setHotelModal} />)}

            {bookingsModal.state && (<ViewBookings
                title={bookingsModal.title}
                setBookingsModal={setBookingsModal}
                hotel={hotel}
                bookings={bookingsModal.param} />)}

            <StatContainer>
                <QuickStat hotel={hotel} setBookingsModal={setBookingsModal} />
            </StatContainer>

            <QuickView>
                <Info style={{ backgroundImage: `url(${hotel.image ? hotel.image : HotelIMG})` }}>
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
                            <div className="card-option" onClick={c.action}>
                                {c.icon}
                                <p>{c.label}</p>
                            </div>
                        ))}
                    </Controls>
                </Info>

                <RoomsList rooms={hotel.rooms} setRoomModal={setRoomModal} />
            </QuickView>


        </PageContainer>
    )
}

export default Dashboard
