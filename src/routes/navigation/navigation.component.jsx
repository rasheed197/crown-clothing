//  USed in App.js

import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartDropdowm from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon  from './../../components/cart-icon/cart-icon.component';

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>    
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={ signOutUser }>SIGN OUT</NavLink>
                        
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>    
               { isCartOpen && <CartDropdowm /> }     
               </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;