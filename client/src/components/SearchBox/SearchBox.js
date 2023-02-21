import React, { useState } from 'react'
import { FormButton, FormTitle, Input } from '../GlobalStyles/FormStyles'
import { SearchBoxContainer } from '../../components/GlobalStyles/PageStyles'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./box.css"
import { useNavigate } from 'react-router-dom';
import SelectOccupancy from './SelectOccupancy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import { fontSize } from '@mui/system';

const Extras = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 12px
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
    const styles = props.styles

    const [checkIn, setCheckIn] = useState(data ? new Date(data.from) : new Date());
    const [checkOut, setCheckOut] = useState(data ? new Date(data.to) : new Date());
    const [query, setQuery] = useState(data ? data.location : '')
    const [count, setCount] = useState({
        children: data ? data.people.children : 0,
        adults: data ? data.people.adults : 0
    })

    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (count.children === 0 && count.adults === 0) {
            toast.warning("Please enter number of people.", {
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
        navigate(`/explore/${query}/${from}/${to}/${count.adults + count.children}`,
            { state: searchData })
    }


    return (
        <SearchBoxContainer style={styles}>
            <FormTitle style={{ marginBottom: '20px', color: '#000', fontSize: '20px' }}>Travel where you want</FormTitle>
            <form onSubmit={handleSearch}>
                <Input placeholder="Enter hotel name or location"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required={true}></Input>
                <Extras>
                    <InputContainer>
                        <label style={{ color: '#000' }}>Check-In</label>
                        <DatePicker selected={checkIn}
                            onChange={(date) => setCheckIn(date)} />
                    </InputContainer>

                    <InputContainer>
                        <label style={{ color: '#000' }}>Check-Out</label>
                        <DatePicker selected={checkOut}
                            onChange={(date) => setCheckOut(date)} />
                    </InputContainer>

                    <InputContainer>
                        <label style={{ color: '#000' }}>Guests</label>
                        <SelectOccupancy count={count} setCount={setCount} />
                    </InputContainer>

                    <FormButton type="submit" className='small-search-button'>
                        <SearchIcon style={{ fontSize: '22px', marginTop: '2px', marginLeft: "2px" }} />
                    </FormButton>
                </Extras>

                <FormButton type="submit" className='large-search-button'>
                    <SearchIcon style={{ fontSize: '22px', marginTop: '2px', marginLeft: "2px" }} />
                </FormButton>

            </form>
        </SearchBoxContainer>
    )
}

export default SearchBox
