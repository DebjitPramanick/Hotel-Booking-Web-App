import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../utils/Context'
import RoomsList from './RoomsList'

const QuickView = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 360px
`
const Info = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 20px;
    background: grey;
    margin-right: 10px;
    max-width: -webkit-fill-available;
`
const Graph = styled.div`
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    background: grey;
    margin-left: 10px;
    max-width: -webkit-fill-available;
`

const Dashboard = () => {
    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Dashboard")
    }, [])

    return (
        <div>
            <QuickView>
                <Info />
                <Graph />
            </QuickView>
            <RoomsList />
        </div>
    )
}

export default Dashboard
