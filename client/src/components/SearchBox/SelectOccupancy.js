import React from 'react'
import styled from "styled-components"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Input, InputContainer } from '../GlobalStyles/FormStyles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const OcpBox = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    width: 100%;
    padding: 10px 12px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #b6b6b6
`

const SelectionBox = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    width: 100%;
    padding: 10px 12px;
    border-radius: 4px;
    .sec{
        display: flex;
        align-items: center;
    }
    .icon{
        color: #ff6e29 !important;
        cursor: pointer;
    }
`

const SelectOccupancy = (props) => {

    const { setCount, count } = props

    return (
        <Tippy placement="bottom"
            interactive={true}
            content={<SelectBox setCount={setCount} count={count} />}
            theme="light" >
            <OcpBox>
                {count.children + count.adults} People
            </OcpBox >
        </Tippy>
    )
}

const SelectBox = (props) => {
    const { setCount, count } = props

    const inc = (p) => {
        if (p === 'children') {
            setCount({ ...count, children: count.children + 1 })
        }
        else {
            setCount({ ...count, adults: count.adults + 1 })
        }
    }

    const dec = (p) => {
        if (p === 'children') {
            if (count.children === 0) return
            setCount({ ...count, children: count.children + 1 })
        }
        else {
            if (count.adults === 0) return
            setCount({ ...count, adults: count.adults + 1 })
        }
    }

    return (
        <SelectionBox>
            <InputContainer style={{ marginRight: '26px' }}>
                <label style={{ color: '#000', textAlign: 'center' }}>Children</label>
                <div className="sec">
                    <RemoveCircleIcon onClick={() => dec('children')} className="icon" />
                    <Input value={count.children} placeholder="Number of children" type="number"
                        min="0"
                        style={{ margin: '0 8px' }}
                        onChange={(e) => {
                            let v = Number(e.target.value)
                            setCount({ ...count, children: v })
                        }}>
                    </Input>
                    <AddCircleIcon onClick={() => inc('children')} className="icon" />
                </div>
            </InputContainer>
            <InputContainer>
                <label style={{ color: '#000', textAlign: 'center' }}>Adults</label>
                <div className="sec">
                    <RemoveCircleIcon onClick={() => dec('adults')} className="icon" />
                    <Input value={count.adults} placeholder="Number of adults" type="number"
                        min="0"
                        style={{ margin: '0 8px' }}
                        onChange={(e) => {
                            let v = Number(e.target.value)
                            setCount({ ...count, adults: v })
                        }}>
                    </Input>
                    <AddCircleIcon onClick={() => inc('adults')} className="icon" />
                </div>
            </InputContainer>
        </SelectionBox>
    )
}

export default SelectOccupancy
