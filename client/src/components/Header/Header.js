import React, { useContext } from 'react'
import "./header.css"
import { GlobalContext } from '../../utils/Context'
import styled from 'styled-components'
import { PageTitle } from '../GlobalStyles/PageStyles'
import HotelLogo from "../../assets/logo.png"
import {Link} from 'react-router-dom'

const FixedHeader = styled.div`
    padding: 12px 16px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
`

const Content = styled.div`
    display: flex;
    align-items: center;
    column-gap: 16px;
    justify-content: space-between
`

const Logo = styled.div`
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        height: 100%
    }
`

const Header = (props) => {
    const { setMenuOpen, menuOpen } = useContext(GlobalContext)
    let pageName = props.page

    const user = JSON.parse(localStorage.getItem('user'))

    const getFirstName = (name) => {
        let names = name.split(" ")
        if(names.length > 0) return names[0];
        else return name;
    }

    return (
        <FixedHeader
            style={menuOpen ? { backgroundColor: '#fff', 
            backdropFilter: 'blur(0px)' } : pageName === 'Home'? {} : {background: 'white'}}>
            <Content>
                <div className="brand">
                    <Link to="/"><Logo><img src={HotelLogo} alt="/" /></Logo></Link>
                    <PageTitle style={menuOpen ? {color: 'black'} : {}}>{pageName}</PageTitle>
                </div>
                {user && (
                    <div className="collection" style={{display: 'flex', alignItems: 'center'}}>
                        <p className='user-name' 
                        style={{display: `${pageName === 'Home' && !menuOpen ? 'block' : 'none'}`}}>
                        Hello, {getFirstName(user.name)}
                        </p>
                        <div class={`menu-icon ${menuOpen ? 'close-icon' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}>
                            <div class="leftright"></div>
                            <div class="rightleft"></div>
                        </div>
                    </div>
                )}
            </Content>

        </FixedHeader>
    )
}

export default Header

