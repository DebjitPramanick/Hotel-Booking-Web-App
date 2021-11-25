import React, { useState } from 'react'
import { FormButton, FormTitle, Input } from '../GlobalStyles/FormStyles'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./box.css"
import { useNavigate } from 'react-router-dom';

const Box = styled.div`
    width: 800px;
    padding: 20px;
    background: #00000063;
    border-radius: 6px;
`

const Extras = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
`

const InputContainer = styled.div`
    width: 100%;
    label{
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        display: block;
        margin-bottom: 8px
    }
`

const OcpBox = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    width: 100%;
    padding: 10px 12px;
    border-radius: 4px
`

const SearchBox = () => {

    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());

    const navigate = useNavigate()

    const handleSearch = () => {
        navigate("/explore")
    }

    return (
        <Box>
            <FormTitle style={{color: '#fff', marginBottom: '20px'}}>Search Hotels</FormTitle>
            <form onSubmit={handleSearch}>
                <Input placeholder="Enter hotel name or location"
                    required={true}></Input>
                <Extras>
                    <InputContainer style={{marginRight: '16px'}}>
                        <label>Check-In</label>
                        <DatePicker selected={checkIn}
                            onChange={(date) => setCheckIn(date)} />
                    </InputContainer>

                    <InputContainer style={{marginRight: '16px'}}>
                        <label>Check-Out</label>
                        <DatePicker selected={checkOut}
                            onChange={(date) => setCheckOut(date)} />
                    </InputContainer>

                    <InputContainer>
                        <label>People</label>
                        <OcpBox >
                            5 People
                        </OcpBox>
                    </InputContainer>

                </Extras>

                <FormButton type="submit"
                style={{margin: '18px 0 0 auto', fontSize: '16px', width: '140px'}}>
                    Search
                </FormButton>

            </form>
        </Box>
    )
}

export default SearchBox
