import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { FormButton, Input, TextArea } from '../GlobalStyles/FormStyles'
import { ModalBox, ModalContainer, ModalTitle } from '../GlobalStyles/ModalStyles'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import "./animation.css"
import { GET_HOTEL } from '../../graphql/queries/hotelQueries'
import { ADD_HOTEL, UPDATE_HOTEL } from '../../graphql/mutations/hotelMutations'
import ImageUpload from '../ImageUpload/ImageUpload';
import { imageUpload } from '../../utils/utilFunctions';
import Loader from '../Loaders/Loader';
import { MAKE_MANAGER } from '../../graphql/mutations/userMutations';

const HotelModal = (props) => {

    const propsHotel = props.hotel
    const user = JSON.parse(localStorage.getItem('user'))

    const [hide, setHide] = useState(false)
    const [loading, setLoading] = useState(false)

    const [hotel, setHotel] = useState({
        name: propsHotel ? propsHotel.name : '',
        description: propsHotel ? propsHotel.description : '',
        id: props.hotel ? props.hotel.id : null,
        image: propsHotel ? propsHotel.image : '',
        ratings: propsHotel ? propsHotel.ratings : null,
        totalRooms: propsHotel ? propsHotel.totalRooms : null,
        location: propsHotel ? propsHotel.location : ''
    })

    const [makeManager] = useMutation(MAKE_MANAGER, {
        variables: {
            id: user.id
        }
    })

    const [addHotel] = useMutation(ADD_HOTEL)

    const [updateHotel] = useMutation(UPDATE_HOTEL, {
        refetchQueries: [
            GET_HOTEL,
            { variables: { id: props.hotel?.id } }
        ],
    })

    const updateCurHotel = async (e) => {
        e.preventDefault()
        setLoading(true)
        const assignedrooms = Object.keys(propsHotel.roomsMap).length
        if (assignedrooms > hotel.totalRooms) {
            toast.warning(`You have already assigned ${assignedrooms} rooms. Unassign those rooms to decrease room numbers.`, {
                autoClose: 5500,
                pauseOnHover: true
            })
            return
        }

        const refPath = `images/hotels/${hotel.id}/hotelImage`
        let imageUrl = null
        if (typeof hotel.image !== 'string') {
            imageUrl = await imageUpload(hotel.image, refPath)
        }

        updateHotel({
            variables: {
                name: hotel.name,
                description: hotel.description,
                id: hotel.id,
                image: imageUrl ? imageUrl : hotel.image,
                ratings: hotel.ratings,
                totalRooms: hotel.totalRooms,
                location: hotel.location
            }
        })
            .then(res => {
                toast.success("Updated hotel.", {
                    autoClose: 5500,
                    pauseOnHover: true,
                    onClose: props.setHotelModal(false)
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

    const addNewHotel = async (e) => {
        e.preventDefault()
        setLoading(true)

        addHotel({
            variables: {
                manager: user.id,
                image: null,
                name: hotel.name,
                description: hotel.description,
                totalRooms: hotel.totalRooms,
                location: hotel.location
            }
        })
            .then(async res => {
                const refPath = `images/hotels/${res.data.addHotel.id}/hotelImage`
                let imageUrl = null
                if (typeof hotel.image !== 'string') {
                    imageUrl = await imageUpload(hotel.image, refPath)
                }
                updateHotel({
                    variables: {
                        name: hotel.name,
                        description: hotel.description,
                        id: res.data.addHotel.id,
                        image: imageUrl,
                        ratings: res.data.addHotel.ratings,
                        totalRooms: hotel.totalRooms,
                        location: hotel.location
                    }
                })
                    .then(res => {
                        toast.success("Hotel added.",{
                            autoClose: 5500,
                            pauseOnHover: true
                        })
                        makeManager({
                            variables: {
                                id: user.id
                            }
                        }).then(res => {
                            localStorage.setItem('user', JSON.stringify(res.data.makeManager))
                            setHide(true)
                            setLoading(false)
                            props.setHotelModal(false)
                        })
                        .catch(err => {
                            toast.error(err.message, {
                                autoClose: 5500,
                                pauseOnHover: true
                            })
                            setLoading(false)
                        })
                    })
                    .catch(err => {
                        toast.error(err.message, {
                            autoClose: 5500,
                            pauseOnHover: true
                        })
                        setLoading(false)
                    })

            })
            .catch(err => {
                toast.error(err.message, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
                setLoading(true)
            })
    }


    return (
        <ModalContainer>
            <ModalBox className="modal-box">
                {!loading ? (
                    <>
                        <CloseIcon className="close-icon" onClick={() => props.setHotelModal(false)} />
                        <ModalTitle>{props.title}</ModalTitle>
                        <ImageUpload imageUrl={hotel.image} refPath={`images/hotels/${hotel.id}/hotelImage`}
                            setImageURL={(val) => setHotel({ ...hotel, image: val })} single={true} />

                        <form onSubmit={props.action === 'update' ? updateCurHotel : addNewHotel}>
                            <Input required="true" style={{ marginBottom: '16px' }}
                                value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                                placeholder="Hotel name">
                            </Input>

                            <TextArea required="true" style={{ marginBottom: '16px' }}
                                value={hotel.description} onChange={(e) => setHotel({ ...hotel, description: e.target.value })}
                                placeholder="Hotel description"></TextArea>

                            <Input required="true" style={{ marginBottom: '16px' }}
                                value={hotel.location} onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
                                placeholder="Location"></Input>

                            <Input required="true" style={{ marginBottom: '16px' }}
                                value={hotel.totalRooms} onChange={(e) => setHotel({ ...hotel, totalRooms: Number(e.target.value) })}
                                placeholder="Total Rooms"></Input>

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

export default HotelModal
