import React, { useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../../components/SearchBar/SearchBar'
import ListHeader from './ListHeader'
import ListItem from "./ListItem"

const Container = styled.div`
    margin-top: 20px;

`

const BookingsList = (props) => {
    const [query, setQuery] = useState('')
    const listItems = ['Hotel Name', 'Room Name', 'From', 'To', 'Price', 'Booked On', 'Amount', 'Paid', 'Actions']

    return (
        <Container>
            <SearchBar
                query={query}
                setQuery={setQuery}
                placeholder="Search bookings by hotel names..." />

            <ListHeader list={listItems} />
            {props.bookings.map(room => 
            <ListItem key={room.id} data={room} />)}
        </Container>
    )
}

export default BookingsList
