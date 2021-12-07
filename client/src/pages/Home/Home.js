import React, { useContext, useEffect } from 'react'
import HomeBG from "../../assets/home.jpg"
import styled from "styled-components"
import { GlobalContext } from '../../utils/Context'
import { PageContainer, SearchBoxContainer, Text } from '../../components/GlobalStyles/PageStyles'
import SearchBox from '../../components/SearchBox/SearchBox'

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    z-index: 999;
    background-image: linear-gradient(#000000d6, #ffffff00)
`

const Home = () => {
    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Home")
    }, [])

    return (
        <PageContainer style={{ 
            backgroundImage: `url(${HomeBG})`, 
            minHeight: '100vh', 
            marginTop: '0px',
            padding: '0px'
         }}>
            <HomeContainer>
                <Text style={{color: "#fff", marginBottom: '60px', fontSize: '40px'}}>
                    We Will Serve You The Best
                </Text>
                <SearchBoxContainer>
                    <SearchBox />
                </SearchBoxContainer>
            </HomeContainer>
        </PageContainer>
    )
}

export default Home
