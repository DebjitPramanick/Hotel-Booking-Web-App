import React, { useContext, useEffect } from 'react'
import HomeBG from "../../assets/home.jpg"
import styled from "styled-components"
import { GlobalContext } from '../../utils/Context'
import { PageContainer, SearchBoxContainer } from '../../components/GlobalStyles/PageStyles'
import SearchBox from '../../components/SearchBox/SearchBox'

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 32px)
`

const Home = () => {
    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Home")
    }, [])

    return (
        <PageContainer style={{ backgroundImage: `url(${HomeBG})`, minHeight: '100vh', marginTop: '0px' }}>
            <HomeContainer>
                <SearchBoxContainer>
                    <SearchBox />
                </SearchBoxContainer>
            </HomeContainer>
        </PageContainer>
    )
}

export default Home
