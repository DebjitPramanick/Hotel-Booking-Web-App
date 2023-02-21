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
import ComponentError from '../../components/Error/ComponentError'

const ResultContainer = styled.div`
    width: calc(100vw - 510px);
    margin-left: auto;

    @media(max-width: 1000px) {
        width: 100%;
        margin-top: 30px
    }

`

const Explore = () => {

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) return <PageLoader />

    return (
        <PageContainer>
            <LeftSidebar data={location.state} />

            <ResultContainer>
                {error ? (<ComponentError error={error} />) : (
                <>
                    {data.searchHotels.map(s =>
                        <Card data={s} params={location.state} />
                    )}
                    {data.searchHotels.length === 0 ?
                        <Text style={{ color: 'grey', textAlign: 'center' }}>No Hotels Found</Text>
                        : null}
                </>
            )}
            </ResultContainer>

        </PageContainer>
    )
}

export default Explore
