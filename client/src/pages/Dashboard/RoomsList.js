import React, {useState} from 'react'
import styled from 'styled-components'
import SearchBar from '../../components/SearchBar/SearchBar'

const Container = styled.div`
    margin-top: 20px;

`

const RoomsList = () => {
    const [query, setQuery] = useState('')

    return (
        <Container>
            <SearchBar 
            query={query}
            setQuery={setQuery}
            placeholder="Search rooms by names..."/>
        </Container>
    )
}

export default RoomsList
