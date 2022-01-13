import React from 'react'
import { FormButton } from '../GlobalStyles/FormStyles'
import { FlexBox, ModalBox, ModalContainer, ModalTitle } from '../GlobalStyles/ModalStyles'
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import "./animation.css"
import { getDate, getEasyDate } from '../../utils/utilFunctions'
import { Text } from '../GlobalStyles/PageStyles'
import Tippy from '@tippyjs/react'
import { ButtonsContainer } from '../../pages/Auth/ModuleStyles'
import { useNavigate } from 'react-router-dom'

const BookingModal = (props) => {

    const booking = props.booking
    const navigate = useNavigate()

    const payLink = () => {
        navigate(`/payment/${booking.hotel.id}/${booking.room.id}/1`, { state: booking })
    }

    return (
        <ModalContainer>
            <ModalBox className="modal-box">
                <CloseIcon className="close-icon"
                    onClick={() => props.setModal({ state: false, param: null, title: '' })} />
                <ModalTitle>{props.title}</ModalTitle>

                <br />

                <Text className="small">Booked By: <span>{booking.bookedBy.name}</span></Text>
                <Text className="small">Username: <span>{booking.bookedBy.username}</span></Text>
                <Tippy interactive={true} content={getEasyDate(booking.bookedOn)} placement="bottom">
                    <Text className="small">Booked On: <span>{getDate(booking.bookedOn)}</span></Text>
                </Tippy>

                <hr />
                <br />

                <FlexBox>

                    <div style={{ flexBasis: '46%' }}>
                        <Text className="small">Hotel: <span>{booking.hotel.name}</span></Text>
                        <Text className="small">Location: <span>{booking.location}</span></Text>
                        <Text className="small">Room: <span>{booking.room.name}</span></Text>
                        <Tippy interactive={true} content={getEasyDate(booking.from)} placement="bottom">
                            <Text className="small">From: <span>{getDate(booking.from)}</span></Text>
                        </Tippy>
                        <Tippy interactive={true} content={getEasyDate(booking.to)} placement="bottom">
                            <Text className="small">To: <span>{getDate(booking.to)}</span></Text>
                        </Tippy>
                        <Text className="small">Duration:
                            <span> {booking.days} {booking.days === 1 ? 'Day' : 'Days'}</span>
                        </Text>
                    </div>

                    <div style={{ flexBasis: '46%' }}>
                        <Text className="small">Rooms: 
                            {booking.roomNumbers.map(r =>
                                (<span className="highlight" style={{ margin: '4px 2px' }}>{r}</span>)
                            )}
                        </Text>
                        <Text className="small">Number of persons: <span>{booking.numOfPeople}</span></Text>
                        <Text className="small">Adults: <span>{booking.people.adults}</span></Text>
                        <Text className="small">Children: <span>{booking.people.children}</span></Text>
                    </div>
                </FlexBox>

                <br />
                <hr />
                <br />
                <Text className="small">Room Price: <span>Rs. {booking.room.price}</span></Text>
                <Text className="small">Amount {booking.paid ? 'Paid' : 'To Be Paid'}: <span>Rs. {booking.amount}</span></Text>
                <Text className="small">Payment Status:
                    <span> {booking.paid ? 'Paid' : 'Not Paid'}</span>
                </Text>
                <ButtonsContainer>
                    <FormButton>View Hotel & Room</FormButton>
                    {!booking.paid ? <FormButton onClick={payLink}>Pay Now</FormButton> : null}
                </ButtonsContainer>
            </ModalBox>
        </ModalContainer>
    )
}

export default BookingModal
