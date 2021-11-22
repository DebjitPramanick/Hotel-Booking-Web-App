import React from 'react'
import "./search.css"
import {Input} from "../GlobalStyles/FormStyles"

const SearchBar = (props) => {
    const dummy = [1, 2, 3]
    return (
        <div className="search-bar">
            <Input placeholder={props.placeholder}
                value={props.query}
                onChange={(e) => props.setQuery(e.target.value)} />
            {dummy.length > 0 && props.query && (
                <div className="search-res">
                    <ul>
                        {dummy.map(d => (
                            <li key={d}>{d}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchBar
