import React, { useContext } from 'react'
import "./header.css"
import { GlobalContext } from '../../utils/Context'
import styled from 'styled-components'
import { PageTitle } from '../GlobalStyles/GlobalStyles'

const FixedHeader = styled.div`
    padding: 12px 16px;
    backdrop-filter: blur(42px);
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff
`

const Content = styled.div`
    display: flex;
    align-items: center;
    column-gap: 16px;
    justify-content: space-between
`

const Header = (props) => {
    const { setMenuOpen, menuOpen } = useContext(GlobalContext)
    let pageName = props.page

    const user = JSON.parse(localStorage.getItem('User'))

    return (
        <FixedHeader
            style={menuOpen ? { backgroundColor: '#262626f6', backdropFilter: 'blur(0px)' } : {}}>
            <Content>
                <div className="brand">
                    <PageTitle>{pageName}</PageTitle>
                </div>
                {user && (
                    <div className="collection">
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

