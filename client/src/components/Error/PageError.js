import React from 'react'
import styled from 'styled-components'
import { Text } from '../GlobalStyles/PageStyles'

const PageMessage = styled.div`
    background: #ff7878;
    padding: 10px 16px;
    color: #fff;
    border-radius: 4px;
    margin: 81px 16px;
    p{
        margin: 0
    }
`

const PageError = (props) => {
    const {error, style} = props
    return (
        <PageMessage style={style}>
            <Text className='small'>{error.message}</Text>
        </PageMessage>
    )
}

export default PageError
