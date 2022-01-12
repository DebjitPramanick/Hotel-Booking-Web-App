import { useQuery } from '@apollo/client'
import React from 'react'
import Loader from '../../../components/Loaders/Loader'
import { GET_HOTEL_BOOKINGS } from '../../../graphql/queries/bookingQueries'
import styled from 'styled-components'
import ComponentError from '../../../components/Error/ComponentError'

const Container = styled.div`
    height: 100%
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-gap: 10px;;
    height: 100%
`

const Block = styled.div`
    height: 100%;
    padding: 16px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    h2{
        margin-bottom: 10px;
    }
`

const Stat = (props) => {
    const { hotel } = props
    const { data, loading, error } = useQuery(GET_HOTEL_BOOKINGS, { variables: { id: hotel.id } })

    const getRandomColor = () => {
        const colors = ['#F1C40F', '#E4CDA7', '#F78812', '#F5C6A5', '#FAAD80', '#FF8303']
        let ridx = Math.floor(Math.random() * colors.length)
        return colors[ridx];
    }

    if (loading) return <Loader />
    if (error) return <ComponentError error={error} />

    const bookings = data.getHotelBookings

    const getTotalEarnings = () => {
        let total = 0;
        bookings.forEach(b => {
            if(b.paid) total+=b.amount
        })
        return total
    }

    const getTodayBookings = () => {
        let total = 0;
        const curDate = new Date().getDate();

        bookings.forEach(b => {
            if(new Date(b.from).getDate()===curDate) total++
        })
        return total
    }

    return (
        <Container>
            <Grid>
                <Block style={{ background: `${getRandomColor()}` }}>
                    <h2>Rs. {getTotalEarnings()}</h2>
                    <p>Total Earnings</p>
                </Block>
                <Block style={{ background: `${getRandomColor()}` }}
                onClick={() => props.setBookingsModal({state: true, title: 'Hotel Bookings', param: bookings})}>
                    <h2>{bookings.length}</h2>
                    <p>Total Bookings</p>
                    <p>(Click To See Bookings)</p>
                </Block>
                <Block style={{ background: `${getRandomColor()}` }}>
                    <h2>{hotel.rooms.length}</h2>
                    <p>Total Rooms</p>
                </Block>
                <Block style={{ background: `${getRandomColor()}` }}>
                    <h2>{getTodayBookings()}</h2>
                    <p>Bookings For Today</p>
                </Block>
            </Grid>
        </Container>
    )
}

export default Stat
