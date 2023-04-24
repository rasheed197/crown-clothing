// Used in cart-dropdown.component.jsx

import { CartItemContainer, CartItemDetails } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={ imageUrl } alt={ `${name}` } />
            <CartItemDetails>
                <span>{ name }</span>
                <span>{ quantity } x ${price}</span>
            </CartItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;