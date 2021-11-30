import React from 'react'
import styled from 'styled-components'
import { Text } from '../../components/GlobalStyles/PageStyles'

const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    margin: auto
`

const Steps = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 4px;
    div{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: red;
        margin-bottom: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }
    p{
        position: absolute;
        top: 120%;
        white-space: nowrap;
        color: grey;
    }
`

const Line = styled.div`
    margin-top: 13px;
    height: 4px;
    width: 100%;
    background: red;
`

const ProgressBar = () => {
    return (
        <Bar>
            <Steps>
                <div>1</div>
                <Text className="small">Curtomer Info</Text>
            </Steps>
            <Line />
            <Steps>
                <div>2</div>
                <Text className="small">Payment</Text>
            </Steps>
            <Line />
            <Steps>
                <div>3</div>
                <Text className="small">Booking Confirmed</Text>
            </Steps>
        </Bar>
    )
}

export default ProgressBar
