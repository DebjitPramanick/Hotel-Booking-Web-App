import React, { useContext, useEffect } from 'react'
import HomeBG from "../../assets/home.jpg"
import styled from "styled-components"
import { GlobalContext } from '../../utils/Context'
import { PageContainer, SearchBoxContainer, Text } from '../../components/GlobalStyles/PageStyles'
import SearchBox from '../../components/SearchBox/SearchBox'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { settings, settings2, urls } from '../../utils/carouselSettings'

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    z-index: 999;
    background-image: url(${HomeBG});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 50vh;
    position: relative;
    border-radius: 0 0 40px 40px
`

const SliderContainer = styled.div`
    margin: 160px auto;
    max-width: 1000px;
    .banners{
        height: 200px;
        padding: 10px
    }
    .banners img{
        width: 100%;
        height: 100%;
        border-radius: 16px
    }
    @media(max-width: 1100px){
        max-width: calc(100vw - 80px);
    }
`

const Home = () => {
    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Home")
    }, [])

    return (
        <PageContainer style={{
            minHeight: '100vh',
            marginTop: '0px',
            padding: '0px'
        }}>
            <HomeContainer>
                <Text style={{ color: "#fff", marginBottom: '10px', fontSize: '40px' }}>
                    We Will Serve You The Best
                </Text>
                <SearchBoxContainer style={{
                    position: 'absolute',
                    bottom: '-150px',
                    background: '#373848'
                }}>
                    <SearchBox />
                </SearchBoxContainer>
            </HomeContainer>

            <SliderContainer>
                <Slider {...settings2}>
                    {urls.map(u => (
                        <div className="banners">
                            <img src={u} alt="" />
                        </div>
                    ))}
                </Slider>
            </SliderContainer>
        </PageContainer>
    )
}

export default Home
