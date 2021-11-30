import React, { useContext, useEffect } from 'react'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import { GlobalContext } from '../../utils/Context'
import ProgressBar from './ProgressBar'
import CustomerInfo from './CustomerInfo'
import { useQuery } from '@apollo/client'
import { GET_ROOM } from '../../graphql/queries/roomQueries'
import {useParams} from 'react-router-dom'


const Payment = () => {

    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Payment")
    }, [])

    const {hotelId, roomId} = useParams()

    const {data, loading, error} = useQuery(GET_ROOM, {variables: {id: roomId}})

    if(loading) return <p>Loading...</p>

    const user = JSON.parse(localStorage.getItem('user'))
    const room = data.getRoom

    return (
        <PageContainer>
            <ProgressBar />
            <CustomerInfo user={user} room={room}/>
        </PageContainer>
    )
}

export default Payment
