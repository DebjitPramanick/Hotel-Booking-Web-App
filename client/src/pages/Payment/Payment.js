import React, { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import { GlobalContext } from '../../utils/Context'
import ProgressBar from './ProgressBar'
import CustomerInfo from './CustomerInfo'
import { useQuery } from '@apollo/client'
import { GET_ROOM } from '../../graphql/queries/roomQueries'
import {useParams} from 'react-router-dom'
import { GET_HOTEL } from '../../graphql/queries/hotelQueries'
import PaymentScreen from './PaymentScreen'
import BookingConfirmed from './BookingConfirmed'
import PageLoader from '../../components/Loaders/PageLoader'


const Payment = () => {

    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Payment")
    }, [])

    const {hotelId, roomId, step} = useParams()

    const {data, loading, error} = useQuery(GET_ROOM, {variables: {id: roomId}})

    if(loading) return <PageLoader />

    const user = JSON.parse(localStorage.getItem('user'))
    const room = data.getRoom

    return (
        <PageContainer>
            <ProgressBar step={step}/>
            {step === '1' && (<CustomerInfo user={user} room={room}/>)}
            {step === '2' && (<PaymentScreen user={user} room={room}/>)}
            {step === '3' && (<BookingConfirmed user={user} room={room}/>)}
        </PageContainer>
    )
}

export default Payment
