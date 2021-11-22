import { useLazyQuery } from '@apollo/client'
import React, {useState} from 'react'
import { LOGIN_USER } from '../../graphql/queries'

const Login = () => {

    const [login] = useLazyQuery(LOGIN_USER, {
        onCompleted: res => {
            let user = res.login
            localStorage.setItem('user', JSON.stringify(user))
        }
    })

    const [data, setdata] = useState({
        email: '',
        password: ''
    })

    const userLogin = async(e) => {
        e.preventDefault()
        login({
            variables: {
                email: data.email,
                password: data.password
            }
        })
    }

    return (
        <div className="login" onSubmit={userLogin}>
            <form className="form-box">
                <h3>Login</h3>
                <input placeholder="Email"
                value={data.email}
                onChange={(e) => setdata({...data, email: e.target.value})}></input>
                <input placeholder="Password"
                type="password"
                value={data.password}
                onChange={(e) => setdata({...data, password: e.target.value})}></input>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login
