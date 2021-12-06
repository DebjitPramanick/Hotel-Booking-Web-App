import React from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { getDate, getEasyDate } from '../../utils/utilFunctions';
import { ActionsContainer, Button, Item, Text } from '../../components/GlobalStyles/TableStyles';

const ListItem = (props) => {
    let keys = Object.keys(props.data)
    keys = keys.filter(k => k!=='others' && k!=='id' && k!=='roomNumbers')
    return (
        <Item style={{ gridTemplateColumns: `repeat(${keys.length}, 1fr)` }}>
            <Text><Tippy interactive={true} content={'Room Image'} placement="bottom"><p>{props.data.name}</p></Tippy></Text>
            <Tippy interactive={true} content={props.data.name} placement="bottom"><Text>{props.data.name}</Text></Tippy>
            <Tippy interactive={true} content={props.data.description} placement="bottom"><Text>{props.data.description}</Text></Tippy>
            <Tippy interactive={true} content={props.data.price} placement="bottom"><Text>{props.data.price}</Text></Tippy>
            <Tippy interactive={true} content={props.data.occupancy} placement="bottom"><Text>{props.data.occupancy}</Text></Tippy>
            <Tippy interactive={true} content={props.data.ratings} placement="bottom"><Text>{props.data.ratings}</Text></Tippy>
            <Tippy interactive={true} content={getEasyDate(props.data.addedOn)} placement="bottom">
                <Text>{getDate(props.data.addedOn)}</Text>
            </Tippy>
            <ActionsContainer>
                <Button onClick={() => props.setRoomModal(
                    {state: true, title: 'Update Room Details', param: props.data, action: 'update'})
                }>
                    <img alt="" width="20px" src="https://img.icons8.com/plumpy/24/000000/edit--v1.png" /></Button>
                <Button><img alt="" width="20px" src="https://img.icons8.com/color/48/000000/connection-status-off--v1.png"/></Button>
                <Button><img alt="" width="20px" src="https://img.icons8.com/flat-round/48/000000/delete-sign.png" /></Button>
            </ActionsContainer>
        </Item>
    )
}

export default ListItem
