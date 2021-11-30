import React, { useContext, useEffect } from 'react'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import { GlobalContext } from '../../utils/Context'
import ProgressBar from './ProgressBar'

const Payment = () => {

    const {setPage} = useContext(GlobalContext)

    useEffect(() => {
        setPage("Payment")
    }, [])

    return (
        <PageContainer>
            <ProgressBar />
        </PageContainer>
    )
}

export default Payment
