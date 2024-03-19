import React, { useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../../components/SearchBar/SearchBar'
import { Text } from "../../components/GlobalStyles/PageStyles"
import Loader from '../../components/Loaders/Loader'
import BookingCard from './BookingCard'
import { GridContainer } from '../../components/GlobalStyles/ModalStyles'

const Container = styled.div`
    margin-top: 20px;

    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

        @media(max-width: 375px){
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
    }

`

const BookingsList = (props) => {

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    const curDate = new Date().setHours(0, 0, 0, 0)

    let upcomingBookings = props.bookings ? props.bookings.filter(b => new Date(b.from) > curDate) : []
    let oldBookings = props.bookings ? props.bookings.filter(b => new Date(b.from) <= curDate) : []

    upcomingBookings = upcomingBookings.filter(b => {
        return b.hotel.name.toLowerCase().includes(query.toString().toLowerCase())
    })
    oldBookings = oldBookings.filter(b => {
        return b.hotel.name.toLowerCase().includes(query.toString().toLowerCase())
    })

    return (
        <Container>
            <SearchBar
                query={query}
                setQuery={setQuery}
                placeholder="Search bookings by hotel names..." />

            <Text style={{ fontSize: '20px', margin: '26px 0' }}>Upcoming Bookings</Text>

            <GridContainer className='grid-container'>
                {!loading ? upcomingBookings.map(booking =>
                    <BookingCard
                        key={booking.id}
                        data={booking}
                        setLoading={setLoading}
                        loading={loading}
                        setModal={props.setModal} />
                ) : <Loader />}
            </GridContainer>
            {upcomingBookings.length === 0 &&
                <Text className="small" style={{ textAlign: 'center', marginTop: '20px' }}>No Bookings</Text>}

            <br />

            <Text style={{ fontSize: '20px', margin: '26px 0' }}>Old Bookings</Text>
            <GridContainer className='grid-container'>
                {!loading ? oldBookings.map(booking =>
                    <BookingCard
                        key={booking.id}
                        data={booking}
                        setLoading={setLoading}
                        loading={loading}
                        setModal={props.setModal}
                        isOld={true} />
                ) : <Loader />}
            </GridContainer>
            {oldBookings.length === 0 &&
                <Text className="small" style={{ textAlign: 'center', marginTop: '20px' }}>No Bookings</Text>}
        </Container>
    )
}

export default BookingsList
