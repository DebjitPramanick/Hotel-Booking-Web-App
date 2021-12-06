import React from 'react'
import styled from 'styled-components'
import { Text } from '../../components/GlobalStyles/PageStyles'

const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    margin: auto;
    @media(max-width: 700px){
        max-width: calc(100vw - 140px)
    }
`

const Steps = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 4px;
    &.cur{
        div{
            background: #00d892;
        }
    }
    div{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #b0b0b0;
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
    background: #b0b0b0;
    &.cur{
        background: #00d892;
    }
`

const ProgressBar = (props) => {
    const {step} = props
    return (
        <Bar>
            <Steps className={`${step>=1 ? 'cur' : ''}`}>
                <div>1</div>
                <Text className="small">Curtomer Info</Text>
            </Steps>

            <Line className={`${step>=2 ? 'cur' : ''}`}/>
            <Steps className={`${step>=2 ? 'cur' : ''}`}>
                <div>2</div>
                <Text className="small">Payment</Text>
            </Steps>

            <Line className={`${step>=3 ? 'cur' : ''}`}/>
            <Steps className={`${step>=3 ? 'cur' : ''}`}>
                <div>3</div>
                <Text className="small">Booking Confirmed</Text>
            </Steps>
        </Bar>
    )
}

export default ProgressBar
