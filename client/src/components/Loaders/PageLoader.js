import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { LoaderBox } from '../GlobalStyles/LoaderStyles'

const PageLoader = () => {
    return (
        <LoaderBox>
            <CircularProgress size={80} style={{color: '#bebebe'}}/>
        </LoaderBox>
    )
}

export default PageLoader
