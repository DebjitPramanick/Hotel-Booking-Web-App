import React from 'react'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {

    const curUser = JSON.parse(localStorage.getItem('User'))

    return (
        <div>
            <Route 
            {...rest}
            render={(props) =>
                curUser? <Component {...props}></Component>
                : <Redirect to="/login"/>
            }/>
        </div>
    )
}

export default PrivateRoute
