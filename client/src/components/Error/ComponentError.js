import React from 'react'
import styled from 'styled-components'
import { Text } from '../GlobalStyles/PageStyles'

const ComponentMessage = styled.div`
    background: #ff7878;
    padding: 10px 16px;
    color: #fff;
    border-radius: 4px;
    p{
        margin: 0
    }
`

const ComponentError = (props) => {
    const {error, style} = props
    return (
        <ComponentMessage style={style}>
            <Text className='small'>{error.message}</Text>
        </ComponentMessage>
    )
}

export default ComponentError
