import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import MenuIcon from './icons/menu.svg'
import CloseIcon from './icons/close.svg'
import CartIcon from './icons/cart.svg'
import {Link} from'react-router-dom'

function Header(){
    const value = useContext(GlobalState)
    return (
        <header>
        <div className="menu" onClick={() => setMenu(!menu)}>
            <img src={MenuIcon} alt="" width="30" />
        </div>

        <div className="logo">
            <h1>
                <Link to="/">{isAdmin ? 'Admin' : 'Book Sells Online'}</Link>
            </h1>
        </div>

        <ul style={styleMenu}>
            <li><Link to="/">{isAdmin ? 'Selling Books' : 'Products'}</Link></li>

            {isAdmin && adminRouter()}

            {
                isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
            }

            <li onClick={() => setMenu(!menu)}>
                <img src={CloseIcon} alt="" width="30" className="menu" />
            </li>

        </ul>

        {
            isAdmin ? '' 
            :<div className="cart-icon">
                <span>{cart.length}</span>
                <Link to="/cart">
                    <img src={CartIcon} alt="" width="30" />
                </Link>
            </div>
        }
        
    </header>
    )
}


export default Header