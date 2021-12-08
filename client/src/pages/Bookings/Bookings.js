import React, {useEffect, useContext} from 'react'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import BookingsList from './BookingsList'
import {GlobalContext} from "../../utils/Context"
import { useQuery } from '@apollo/client'
import { GET_USER_BOOKINGS } from '../../graphql/queries/bookingQueries'
import PageLoader from "../../components/Loaders/PageLoader.js"

const Bookings = () => {

    const {setPage} = useContext(GlobalContext)
    
    useEffect(() => {
        setPage("Bookings")
    }, [])

    const user = JSON.parse(localStorage.getItem('user'))

    const {data, loading, error} = useQuery(GET_USER_BOOKINGS,{variables: {id: user.id}})

    if(loading) return <PageLoader />

    const bookings = data.getUserBookings

    return (
        <PageContainer>
            <BookingsList bookings={bookings}/>
        </PageContainer>
    )
}

export default Bookings
