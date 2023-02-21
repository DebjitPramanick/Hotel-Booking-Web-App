import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import SearchBox from '../SearchBox/SearchBox'
import styled from "styled-components"

const SidebarContainer = styled.div`
    background: #fff;
    border-radius: 10px;
    position: fixed;
    width: 460px;
    z-index: 9;

    @media(max-width: 1000px) {
        width: 100%;
        position: relative;
    }
`

const LeftSidebar = (props) => {

    return (
        <SidebarContainer>
            <SearchBox params={props.data} styles={{
                background: '#ff6e2926',
            }}/>
        </SidebarContainer>
    )
}

export default LeftSidebar
