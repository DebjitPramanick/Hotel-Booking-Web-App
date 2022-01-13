import React from 'react'
import "./search.css"
import {Input} from "../GlobalStyles/FormStyles"

const SearchBar = (props) => {
    return (
        <div className="search-bar">
            <Input placeholder={props.placeholder}
                value={props.query}
                onChange={(e) => props.setQuery(e.target.value)} />
        </div>
    )
}

export default SearchBar
