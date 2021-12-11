import React, { useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../../components/SearchBar/SearchBar'
import ListHeader from './ListHeader'
import ListItem from "./ListItem"
import { Text } from "../../components/GlobalStyles/PageStyles"
import Loader from '../../components/Loaders/Loader'

const Container = styled.div`
    margin-top: 20px;

`

const BookingsList = (props) => {

    console.log(props)
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const listItems = ['Hotel Name', 'Room Name', 'From', 'To', 'Booked On', 'Amount', 'Paid', 'Actions']

    return (
        <Container>
            <SearchBar
                query={query}
                setQuery={setQuery}
                placeholder="Search bookings by hotel names..." />

            <ListHeader list={listItems} />
            {!loading ? props.bookings.map(booking =>
                <ListItem key={booking.id}
                    data={booking}
                    setLoading={setLoading}
                    loading={loading} />
            ) : <Loader />}
            {props.bookings.length === 0 &&
                <Text className="small" style={{ textAlign: 'center' }}>No Bookings</Text>}
        </Container>
    )
}

export default BookingsList
