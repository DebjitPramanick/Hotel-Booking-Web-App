import React from 'react'
import styled from 'styled-components'
import ComponentError from '../../../components/Error/ComponentError';
import Loader from '../../../components/Loaders/Loader';
import { useQuery } from '@apollo/client';
import { GET_HOTEL_BOOKINGS } from '../../../graphql/queries/bookingQueries';
import { Text } from '../../../components/GlobalStyles/TableStyles';

const CardContainer = styled.div`
    background: white;
    box-shadow: 2px 3px 7px 0px #66666682;
    border-radius: 6px;
    max-width: 100%;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    height: 100%
`

const Block = styled.div`
    height: 100%;
    width: 100%;
    padding: 26px;
    border: 1px solid #e2e2e2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    &:hover{
        box-shadow: 2px 3px 7px 0px #66666682;
    }
    h2{
        margin-bottom: 10px;
    }

    p {
        color: grey;
        font-size: 14px;
        text-align: center
    }
`

const QuickStat = (props) => {

    const { hotel } = props
    const { data, loading, error } = useQuery(GET_HOTEL_BOOKINGS, { variables: { id: hotel.id } })

    if (loading) return <Loader />
    if (error) return <ComponentError error={error} />

    const bookings = data.getHotelBookings

    const getTotalEarnings = () => {
        let total = 0;
        bookings.forEach(b => {
            if (b.paid) total += b.amount
        })
        return total
    }

    const getTodayBookings = () => {
        let total = 0;
        const curDate = new Date().getDate();

        bookings.forEach(b => {
            if (new Date(b.from).getDate() === curDate) total++
        })
        return total
    }


    return (
        <CardContainer>
            <Grid>
                <Block>
                    <h2><span style={{fontSize: '10px'}}>Rs.</span> {getTotalEarnings()}</h2>
                    <Text>Total Earnings</Text>
                </Block>
                {/* <Divider /> */}
                <Block
                    onClick={() => props.setBookingsModal({ state: true, title: 'Hotel Bookings', param: bookings })}>
                    <h2>{bookings.length}</h2>
                    <Text>All Bookings (Click)</Text>
                </Block>
                {/* <Divider /> */}
                <Block>
                    <h2>{hotel.rooms.length} / {hotel.totalRooms}</h2>
                    <Text>Available Rooms</Text>
                </Block>
                {/* <Divider /> */}
                <Block>
                    <h2>{getTodayBookings()}</h2>
                    <Text>Bookings For Today</Text>
                </Block>
            </Grid>

        </CardContainer>
    )
}

export default QuickStat