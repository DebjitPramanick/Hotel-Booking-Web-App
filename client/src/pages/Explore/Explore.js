import React, { useContext, useEffect } from 'react'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import { GlobalContext } from '../../utils/Context'
import styled from "styled-components"
import LeftSidebar from '../../components/Sidebars/LeftSidebar'
import Card from "./Card"

const ResultContainer = styled.div`
    width: calc(100vw - 510px);
    margin-left: auto
`

const Explore = () => {

    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Explore")
    }, [])

    return (
        <PageContainer>
            <LeftSidebar />
            <ResultContainer>
                {[1,2,3,4].map(c => (<Card />))}
            </ResultContainer>
        </PageContainer>
    )
}

export default Explore
