import React, { useContext, useEffect } from 'react'
import { PageContainer, Text } from '../../components/GlobalStyles/PageStyles'
import { GlobalContext } from '../../utils/Context'
import styled from "styled-components"
import LeftSidebar from '../../components/Sidebars/LeftSidebar'
import Card from "./Card"
import { useParams, useLocation } from 'react-router'
import { useQuery } from '@apollo/client'
import { SEARCH_HOTELS } from '../../graphql/queries/hotelQueries'
import PageLoader from '../../components/Loaders/PageLoader'

const ResultContainer = styled.div`
    width: calc(100vw - 510px);
    margin-left: auto
`

const Explore = (props) => {

    const { setPage } = useContext(GlobalContext)
    const params = useParams()
    const location = useLocation()

    const { data, loading, error } = useQuery(SEARCH_HOTELS, {
        variables: {
            location: params.location,
            from: params.checkIn,
            to: params.checkOut,
            occupancy: Number(params.people)
        }
    })

    useEffect(() => {
        setPage("Explore")
    }, [])

    if (loading) return <PageLoader />

    return (
        <PageContainer>
            <LeftSidebar data={params} />
            <ResultContainer>
                {data.searchHotels.map(s =>
                    <Card data={s} params={location.state}/>
                )}
                <Text style={{color: 'grey', textAlign: 'center'}}>No Hotels Found</Text>
            </ResultContainer>
        </PageContainer>
    )
}

export default Explore
