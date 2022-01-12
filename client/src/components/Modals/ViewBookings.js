import React from 'react'
import { ModalBox, ModalContainer, ModalTitle } from '../GlobalStyles/ModalStyles'
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import "./animation.css"
import Bookings from '../../pages/Bookings/Bookings';

const ViewBookings = (props) => {

    return (
        <ModalContainer>
            <ModalBox className="modal-box" style={{width: '1200px'}}>
                <CloseIcon className="close-icon"
                    onClick={() => props.setBookingsModal({ state: false, title: '' })} />
                <ModalTitle>{props.title}</ModalTitle>

                <Bookings 
                style={{marginTop: '0px', padding: '0px'}}
                filter={'hotel'}
                hotel={props.hotel}
                bookingsData={props.bookings}/>
                
            </ModalBox>
        </ModalContainer>
    )
}

export default ViewBookings
