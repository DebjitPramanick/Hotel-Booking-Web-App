import React, { useState } from 'react'
import { FormButton, FormTitle, Input } from '../GlobalStyles/FormStyles'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./box.css"
import { useNavigate } from 'react-router-dom';
import SelectOccupancy from './SelectOccupancy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const SearchBox = (props) => {

    const data = props.params
    console.log(data)

    const [checkIn, setCheckIn] = useState(data ? new Date(data.from) : new Date());
    const [checkOut, setCheckOut] = useState(data ? new Date(data.to) : new Date());
    const [query, setQuery] = useState(data ? data.location : '')
    const [count, setCount] = useState({
        children: data.people.children,
        adults: data.people.adults
    })

    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if(count.children===0 && count.adults===0) {
            toast.warning("Please enter number of people.",{
                autoClose: 5500,
                pauseOnHover: true
            })
            return
        }
        const from = checkIn.toISOString()
        const to = checkOut.toISOString()
        const searchData = {
            from: from,
            to: to,
            people: count,
            location: query
        }
        navigate(`/explore/${query}/${from}/${to}/${count.adults+count.children}`, 
        {state: searchData})
    }

    return (
        <>
            <FormTitle style={{ color: '#fff', marginBottom: '20px' }}>Search Hotels</FormTitle>
            <form onSubmit={handleSearch}>
                <Input placeholder="Enter hotel name or location"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required={true}></Input>
                <Extras>
                    <InputContainer style={{ marginRight: '16px' }}>
                        <label>Check-In</label>
                        <DatePicker selected={checkIn}
                            onChange={(date) => setCheckIn(date)} />
                    </InputContainer>

                    <InputContainer style={{ marginRight: '16px' }}>
                        <label>Check-Out</label>
                        <DatePicker selected={checkOut}
                            onChange={(date) => setCheckOut(date)} />
                    </InputContainer>

                    <InputContainer>
                        <label>People</label>
                        <SelectOccupancy count={count} setCount={setCount}/>
                    </InputContainer>

                </Extras>

                <FormButton type="submit"
                    style={{ margin: '18px 0 0 auto', fontSize: '16px', width: '140px' }}>
                    Search
                </FormButton>

            </form>
        </>
    )
}

export default SearchBox
