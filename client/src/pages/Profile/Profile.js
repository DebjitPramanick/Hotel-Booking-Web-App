import React, { useContext, useEffect } from 'react'
import { PageContainer, Text } from '../../components/GlobalStyles/PageStyles'
import { GlobalContext } from '../../utils/Context'
import styled from 'styled-components'
import { FormButton, Input } from '../../components/GlobalStyles/FormStyles'
import { getEasyDate } from '../../utils/utilFunctions'

const Fields = styled.div`
    margin-bottom: 16px;
    width: 100%;
    &.flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .first{
            margin-right: 16px
        }
    }
    label{
        display: block;
        margin-bottom: 10px
    }
`

const Badge = styled.div`
    position: absolute;
    top: -20px;
    right: -30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    background: #4158ff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
`

const Profile = () => {

    const { setPage } = useContext(GlobalContext)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        setPage("Profile")
    }, [])

    return (
        <PageContainer style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>

            <Text style={{position: 'relative', width: 'fit-content'}}>
                Hello {user.name}
                {user.isManager && (<Badge>M</Badge>)}
            </Text>
            <Text className='small' style={{marginBottom: '8px'}}>
                Joined on {getEasyDate(user.joined)}
            </Text>
            <Text className='small'>Type: {user.isManager ? 'Hotel Manager' : user.isAdmin ? 'Admin' : 'User'}</Text>

            <Fields className='flex'>
                <Fields className='first'>
                    <label>Name</label>
                    <Input value={user.name}></Input>
                </Fields>
                <Fields>
                    <label>Username</label>
                    <Input value={user.username}></Input>
                </Fields>
            </Fields>

            <Fields className='flex'>
                <Fields className='first'>
                    <label>E-Mail</label>
                    <Input value={user.email}></Input>
                </Fields>
                <Fields>
                    <label>DOB</label>
                    <Input value={getEasyDate(user.dob)}></Input>
                </Fields>
            </Fields>

            <FormButton style={{marginLeft: 'auto'}}>Update & Save</FormButton>
        </PageContainer>
    )
}

export default Profile
