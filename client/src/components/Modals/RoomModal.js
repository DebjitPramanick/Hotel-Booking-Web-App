import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ADD_ROOM, UPDATE_ROOM } from '../../graphql/mutations/roomMutations'
import { FormButton, Input, TextArea } from '../GlobalStyles/FormStyles'
import { AddField, GridContainer, ModalBox, ModalContainer, ModalTitle, RoomSelectionBox } from '../GlobalStyles/ModalStyles'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import "./animation.css"
import { GET_HOTEL } from '../../graphql/queries/hotelQueries'
import ImageUpload from '../ImageUpload/ImageUpload'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { bulkImageUpload, deleteImageBulk, imageUpload } from '../../utils/utilFunctions'
import Loader from '../Loaders/Loader'

const RoomModal = (props) => {

    const propsRoom = props.room

    const [addRoom] = useMutation(ADD_ROOM, {
        refetchQueries: [
            GET_HOTEL,
            { variables: { id: props.hotel.id } }
        ],
    })

    const [updateRoom] = useMutation(UPDATE_ROOM, {
        refetchQueries: [
            GET_HOTEL,
            { variables: { id: props.hotel.id } }
        ],
    })

    const [hide, setHide] = useState(false)
    const [loading, setLoading] = useState(false)

    const [room, setRoom] = useState({
        name: propsRoom ? propsRoom.name : '',
        description: propsRoom ? propsRoom.description : '',
        hotel: props.hotel.id,
        images: propsRoom ? propsRoom.images : [],
        others: propsRoom ? propsRoom.others : [],
        occupancy: propsRoom ? propsRoom.occupancy : null,
        price: propsRoom ? propsRoom.price : null,
        roomNumbers: propsRoom ? propsRoom.roomNumbers : []
    })

    const [roomImages, setRoomImages] = useState([])

    const [selected, setSelected] = useState([])

    const addField = () => {
        setRoomImages([...roomImages, { url: null, uuid: null }])
    }

    const addNewRoom = (e) => {
        e.preventDefault()
        setLoading(true)
        addRoom({
            variables: {
                name: room.name,
                description: room.description,
                hotel: room.hotel,
                images: roomImages[0] === '' ? room.images : roomImages,
                others: room.others,
                occupancy: room.occupancy,
                price: room.price,
                roomNumbers: room.roomNumbers
            }
        })
            .then(res => {
                toast.success("New room added", {
                    autoClose: 5500,
                    pauseOnHover: true,
                    onClose: props.setRoomModal(false)
                })
                setHide(true)
                setLoading(false)
            })
            .catch(err => {
                toast.error(err.message, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
                setLoading(true)
            })
    }

    const updateHotelRoom = async (e) => {
        e.preventDefault()
        setLoading(true)

        let images = []

        if (selected.length > 0) {
            room.images.forEach(i => {
                if(!selected.includes(i.uuid)){
                    images.push({url: i.url, uuid: i.uuid})
                }
            })
            let delImages = []
            room.images.forEach(i => {
                if(selected.includes(i.uuid)){
                    delImages.push({url: i.url, uuid: i.uuid})
                }
            })
            await deleteImageBulk(delImages, propsRoom.id)
        }
        if(roomImages.length > 0){
            room.images.forEach(i => {
                images.push({url: i.url, uuid: i.uuid})
            })
            let udImages = await bulkImageUpload(roomImages, propsRoom)
            images = images.concat(udImages)
        }

        updateRoom({
            variables: {
                id: propsRoom.id,
                name: room.name,
                description: room.description,
                images: images,
                others: room.others,
                occupancy: room.occupancy,
                price: room.price,
                roomNumbers: room.roomNumbers
            }
        })
            .then(res => {
                toast.success("Room updated", {
                    autoClose: 5500,
                    pauseOnHover: true,
                    onClose: props.setRoomModal(false)
                })
                setHide(true)
                setLoading(false)
            })
            .catch(err => {
                toast.error(err.message, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
                setLoading(false)
            })
    }

    const roomSlots = Array.from({ length: props.hotel.totalRooms }, (x, i) => {
        const s = {
            number: i + 1,
            assigned: props.hotel.roomsMap[`${i + 1}`] && !room.roomNumbers.includes(i + 1)
        }
        return s
    })

    const addNumber = (n, assigned) => {
        if (room.roomNumbers.includes(n) && !assigned) {
            let ns = room.roomNumbers.filter(s => s !== n)
            setRoom({ ...room, roomNumbers: ns })
        }
        else if (!assigned) {
            let ns = room.roomNumbers
            ns.push(n)
            setRoom({ ...room, roomNumbers: ns })
        }
        else return
    }

    const changeImage = (val, idx) => {
        let temp = roomImages
        temp[idx] = val
        setRoomImages(temp)
    }


    return (
        <ModalContainer>
            <ModalBox className="modal-box">
                {!loading ? (
                    <>
                        <CloseIcon className="close-icon" onClick={() => props.setRoomModal(false)} />
                        <ModalTitle>{props.title}</ModalTitle>

                        <GridContainer>
                            {room.images.map((image, idx) => (
                                <ImageUpload key={image.uuid}
                                    imageUrl={image.url}
                                    data={image}
                                    styles={{ height: '160px' }}
                                    setImageURL={(val) => changeImage(val, idx)}
                                    setSelected={setSelected}
                                    selected={selected} />
                            ))}
                            {roomImages.map((image, idx) => (
                                <ImageUpload key={image.uuid}
                                    imageUrl={image.url}
                                    data={image}
                                    styles={{ height: '160px' }}
                                    setImageURL={(val) => changeImage(val, idx)}
                                    setSelected={setSelected}
                                    selected={selected} />
                            ))}
                            <AddField onClick={() => addField()}>
                                <AddCircleIcon className="plus-icon" />
                            </AddField>
                        </GridContainer>


                        <form onSubmit={props.action === 'update' ? updateHotelRoom : addNewRoom}>
                            <Input required="true" style={{ marginBottom: '16px' }}
                                value={room.name} onChange={(e) => setRoom({ ...room, name: e.target.value })}
                                placeholder="Room name">
                            </Input>

                            <TextArea required="true" style={{ marginBottom: '16px' }}
                                value={room.description} onChange={(e) => setRoom({ ...room, description: e.target.value })}
                                placeholder="Room description"></TextArea>

                            <Input required="true" style={{ marginBottom: '16px' }}
                                type="number"
                                value={room.occupancy} onChange={(e) => setRoom({ ...room, occupancy: Number(e.target.value) })}
                                placeholder="Occupancy"></Input>

                            <TextArea required="true" style={{ marginBottom: '16px' }}
                                value={room.others}
                                onChange={(e) => setRoom({ ...room, others: e.target.value.split(',') })}
                                placeholder="Room specifications (Add using ',')"></TextArea>

                            <Input required="true" style={{ marginBottom: '16px' }}
                                type="number"
                                value={room.price} onChange={(e) => setRoom({ ...room, price: Number(e.target.value) })}
                                placeholder="Price"></Input>

                            <RoomSelectionBox>
                                {roomSlots.map(t => (
                                    <div className={`${t.assigned ? 'assigned' :
                                        room.roomNumbers.includes(t.number) ? 'selected' : ''}`}
                                        onClick={() => addNumber(t.number, t.assigned)}
                                    >{t.number}</div>
                                ))}
                            </RoomSelectionBox>

                            {!hide && (
                                <FormButton type="submit"
                                    style={{ marginLeft: 'auto', marginTop: '40px' }}>
                                    {props.title}
                                </FormButton>
                            )}
                        </form>
                    </>
                ) : <Loader />}
            </ModalBox>
        </ModalContainer>
    )
}

export default RoomModal
