import React from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { getDate, getEasyDate } from '../../utils/utilFunctions';
import { ActionsContainer, Button, Item, Text } from '../../components/GlobalStyles/TableStyles';
import { useNavigate } from "react-router-dom"
import { useMutation } from '@apollo/client';
import { DELETE_ROOM } from '../../graphql/mutations/roomMutations';
import { GET_HOTEL } from '../../graphql/queries/hotelQueries';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

const ListItem = (props) => {

    const [deleteRoom] = useMutation(DELETE_ROOM)

    let keys = props.items
    console.log(keys, props.data)
    const navigate = useNavigate()

    const handleDelete = () => {
        props.setLoading(true)
        deleteRoom({
            variables: {
                id: props.data.id
            },
            refetchQueries: [
                GET_HOTEL,
                { variables: { id: props.data.hotel.id } }
            ]
        }).then(res => {
            props.setLoading(false)
            toast.success('Room deleted successfully', {
                autoClose: 5500,
                pauseOnHover: true
            })
        }).catch(err => {
            props.setLoading(false)
            toast.error(err.message, {
                autoClose: 5500,
                pauseOnHover: true
            })
        })
    }

    return (
        <>
            <Item style={{ gridTemplateColumns: `repeat(${keys.length}, 1fr)` }} className="normal-col">
                <Text>{props.data.name}</Text>
                <Tippy interactive={true} content={props.data.price} placement="bottom"><Text>{props.data.price}</Text></Tippy>
                <Tippy interactive={true} content={props.data.occupancy} placement="bottom"><Text>{props.data.occupancy}</Text></Tippy>
                <Tippy interactive={true} content={getEasyDate(props.data.addedOn)} placement="bottom">
                    <Text>{getDate(props.data.addedOn)}</Text>
                </Tippy>
                <ActionsContainer>
                    <Button onClick={() => props.setRoomModal(
                        { state: true, title: 'Update Room Details', param: props.data, action: 'update' })
                    }>
                        <img alt="" width="20px" src="https://img.icons8.com/plumpy/24/000000/edit--v1.png" /></Button>
                    <Button onClick={() => navigate(`/hotel/${props.data.hotel.id}`, { state: { view: 'manager' } })}
                    ><img alt="" width="20px" src="https://img.icons8.com/color/48/000000/connection-status-off--v1.png" /></Button>
                    <Button onClick={handleDelete}><DeleteIcon style={{ color: '#ff6464' }} /></Button>
                </ActionsContainer>
            </Item>

            <Item className="responsive-col">
                <Text>{props.data.name}</Text>
                <ActionsContainer style={{justifyContent: 'flex-end'}}>
                    <Button onClick={() => props.setRoomModal(
                        { state: true, title: 'Update Room Details', param: props.data, action: 'update' })
                    }>
                        <img alt="" width="20px" src="https://img.icons8.com/plumpy/24/000000/edit--v1.png" /></Button>
                    <Button onClick={() => navigate(`/hotel/${props.data.hotel.id}`, { state: { view: 'manager' } })}
                    ><img alt="" width="20px" src="https://img.icons8.com/color/48/000000/connection-status-off--v1.png" /></Button>
                    <Button onClick={handleDelete}><DeleteIcon style={{ color: '#ff6464' }} /></Button>
                </ActionsContainer>
            </Item>
        </>
    )
}

export default ListItem
