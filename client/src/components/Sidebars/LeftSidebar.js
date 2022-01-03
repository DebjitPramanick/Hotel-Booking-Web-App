import React from 'react'
import { SidebarContainer } from './ComponentStyles'
import {SearchBoxContainer} from "../GlobalStyles/PageStyles"
import "react-datepicker/dist/react-datepicker.css";
import SearchBox from '../SearchBox/SearchBox'


const LeftSidebar = (props) => {

    return (
        <SidebarContainer>
            <SearchBoxContainer>
                <SearchBox params={props.data}/>
            </SearchBoxContainer>
        </SidebarContainer>
    )
}

export default LeftSidebar
