import { useLazyQuery } from '@apollo/client'
import React, { useContext, useState, useEffect } from 'react'
import { FormButton, FormTitle, Input } from '../../components/GlobalStyles/FormStyles'
import { LOGIN_USER } from '../../graphql/queries/userQueries'
import { GlobalContext } from '../../utils/Context'
import { AuthContainer, ButtonsContainer, FormContainer } from './ModuleStyles'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage('Login')
    }, [])

    const navigate = useNavigate()

    const [login] = useLazyQuery(LOGIN_USER, {
        fetchPolicy: 'network-only',
        onCompleted: res => {
            let user = res.login
            localStorage.setItem('user', JSON.stringify(user))
            setTimeout(() => {
                user.isManager ? 
                window.location.href = '/dashboard' : 
                window.location.href = '/'
            }, 1000);
        },
        onError: err => {
            alert(err.message)
        }
    })

    const [data, setdata] = useState({
        email: '',
        password: ''
    })

    const userLogin = async (e) => {
        e.preventDefault()
        login({
            variables: {
                email: data.email,
                password: data.password
            }
        })
    }

    return (
        <AuthContainer>
            <FormContainer>
                <form className="form-box" onSubmit={userLogin}>
                    <FormTitle style={{ marginBottom: '20px' }}>Log In</FormTitle>
                    <Input style={{ margin: '10px 0' }}
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setdata({ ...data, email: e.target.value })}></Input>
                    <Input style={{ margin: '10px 0' }}
                        placeholder="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setdata({ ...data, password: e.target.value })}></Input>
                    <ButtonsContainer>
                        <FormButton style={{border: '2px solid #ff6899', background: "#fff", color: "#ff6899"}}
                        onClick={() => navigate('/register')}
                        >Register</FormButton>
                        <FormButton type="submit">Log In</FormButton>
                    </ButtonsContainer>
                </form>
            </FormContainer>
        </AuthContainer>
    )
}

export default Login
