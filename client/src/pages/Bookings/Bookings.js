import React, {useEffect, useContext} from 'react'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import BookingsList from './BookingsList'
import {GlobalContext} from "../../utils/Context"

const Bookings = () => {

    const {setPage} = useContext(GlobalContext)

    useEffect(() => {
        setPage("Bookings")
    }, [])

    return (
        <PageContainer>
            <BookingsList bookings={[]}/>
        </PageContainer>
    )
}

export default Bookings
