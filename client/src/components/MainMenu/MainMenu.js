import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./menu.css"
import FadeIn from 'react-fade-in';
import { GlobalContext } from '../../utils/Context';

const MainMenu = () => {

    const { menuOpen, setMenuOpen } = useContext(GlobalContext)
    const user = JSON.parse(localStorage.getItem('User'))
    useEffect(() => {
        if(menuOpen){
            document.body.style.overflow = 'hidden'
        }
        else{
            document.body.style.overflow = 'visible'
        }
    }, [menuOpen])

    let menuOptions = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Shop',
            path: '/shop'
        },
        {
            name: 'Orders',
            path: '/orders'
        },
        {
            name: 'Edit Account',
            path: '/edit/user'
        },
        {
            name: 'Log Out',
            path: '/logout'
        }
    ]

    if(user && !user.isAdmin) {
        let lOpt = menuOptions.slice(3, 5)
        menuOptions = menuOptions.slice(0, 3)
        menuOptions.push({name: 'Dashboard', path: '/dashboard'})
        menuOptions = menuOptions.concat(lOpt)
    }

    return (
        <div className={`main-menu-container ${menuOpen ? 'open' : ''}`}>
            {menuOpen && (
                <div className="menu-content">
                    <FadeIn delay={200}>
                        <div className="user-details">
                            <div className="details">
                                <p className="username">@{user.firstName}</p>
                                <p className="wallet-address">{user.walletAddress}</p>
                            </div>
                        </div>
                    </FadeIn>
                    <ul className="list-items">
                        {menuOptions.map((mp, i) => (
                            <li>
                                <FadeIn delay={300 * (i + 1)}>
                                    <Link onClick={() => setMenuOpen(false)}
                                    to={`${mp.path}`}>{mp.name}</Link>
                                </FadeIn>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default MainMenu
