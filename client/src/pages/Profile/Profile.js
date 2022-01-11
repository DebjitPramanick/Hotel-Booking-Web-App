import React, { useContext, useEffect, useState } from 'react'
import { PageContainer, Text } from '../../components/GlobalStyles/PageStyles'
import { GlobalContext } from '../../utils/Context'
import styled from 'styled-components'
import { FormButton, Input } from '../../components/GlobalStyles/FormStyles'
import { getEasyDate } from '../../utils/utilFunctions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HotelModal from '../../components/Modals/HotelModal'
import { useMutation } from '@apollo/client'
import { GET_USER } from '../../graphql/queries/userQueries'
import { UPDATE_USER } from '../../graphql/mutations/userMutations'
import { toast } from 'react-toastify'

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

    const [open, setOpen] = useState({
        state: false,
        title: '',
        param: null,
        action: ''
    })
    const [showBtn, setShowBtn] = useState(false)

    const [curUser, setCurUser] = useState(user)

    useEffect(() => {
        setPage("Profile")
    }, [])

    const [updateProfile] = useMutation(UPDATE_USER, {
        refetchQueries: [
            GET_USER,
            {
                variables: {
                    id: user.id
                }
            }
        ]
    })

    useEffect(() => {
        if(curUser.name !== user.name){
            setShowBtn(true)
        }
        else if(curUser.email !== user.email){
            setShowBtn(true)
        }
        else if(curUser.dob !== user.dob){
            setShowBtn(true)
        }else{
            setShowBtn(false)
        }
    }, [curUser])

    const updateUser = () => {
        updateProfile({
            variables: {
                id: '',
                name: curUser.name,
                email: curUser.email,
                dob: curUser.dob,
                username: curUser.username
            }
        }).then(res => {
            setShowBtn(false)
            localStorage.setItem('user', JSON.stringify(res.data.updateProfile))
            toast.success("User details updated.", {
                autoClose: 5500,
                pauseOnHover: true,
            })
        }).catch(err => {
            setShowBtn(false)
            toast.error(err.message, {
                autoClose: 5500,
                pauseOnHover: true,
            })
            setCurUser(user)
        })
    }

    return (
        <PageContainer style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>

            {open.state && (<HotelModal
                action={open.action} title={open.title} hotel={null}
                setHotelModal={setOpen} />)}

            <Text style={{ position: 'relative', width: 'fit-content' }}>
                Hello {user.name}
                {user.isManager && (<Badge>M</Badge>)}
            </Text>
            <Text className='small' style={{ marginBottom: '8px' }}>
                Joined on {getEasyDate(user.joined)}
            </Text>
            <Text className='small'>Type: {user.isManager ? 'Hotel Manager' : user.isAdmin ? 'Admin' : 'User'}</Text>
            {!user.isManager ?
                <FormButton style={{ margin: '16px 0', borderRadius: '2px' }}
                    onClick={() => setOpen({ state: true, title: 'Add Hotel', params: null, action: 'add' })}>
                    Add My Hotel</FormButton>
                : null}

            <Fields className='flex'>
                <Fields className='first'>
                    <label>Name</label>
                    <Input value={curUser.name}
                        onChange={(e) => setCurUser({ ...curUser, name: e.target.value })}></Input>
                </Fields>
                <Fields>
                    <label>Username</label>
                    <Input value={user.username}></Input>
                </Fields>
            </Fields>

            <Fields className='flex'>
                <Fields className='first'>
                    <label>E-Mail</label>
                    <Input value={curUser.email}
                        onChange={(e) => setCurUser({ ...curUser, email: e.target.value })}></Input>
                </Fields>
                <Fields>
                    <label>DOB</label>
                    {/* <Input value={getEasyDate(user.dob)}></Input> */}
                    <DatePicker selected={new Date(curUser.dob)}
                        onChange={(date) => setCurUser({ ...curUser, dob: date })}
                    />
                </Fields>
            </Fields>

            {showBtn ? (<FormButton style={{ marginLeft: 'auto' }} onClick={updateUser}>Update & Save</FormButton>) : null}
        </PageContainer>
    )
}

export default Profile
