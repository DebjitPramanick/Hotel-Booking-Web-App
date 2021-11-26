import React, { useState, useEffect } from 'react'
import { SidebarContainer } from './ComponentStyles'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FormButton, FormTitle, Input } from '../GlobalStyles/FormStyles'
import {SearchBoxContainer} from "../GlobalStyles/PageStyles"
import DatePicker from "react-datepicker";
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
