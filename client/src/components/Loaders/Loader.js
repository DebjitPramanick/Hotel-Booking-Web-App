import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { LoaderBox } from '../GlobalStyles/LoaderStyles'

const Loader = () => {
    return (
        <LoaderBox style={{height: '100%', padding: '60px 0'}}>
            <CircularProgress size={60} style={{color: '#bebebe'}}/>
        </LoaderBox>
    )
}

export default Loader
