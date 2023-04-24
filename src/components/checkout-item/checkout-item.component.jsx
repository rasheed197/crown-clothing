import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles.jsx'

const CheckoutItem = ({ cartItem }) => {
    const { clearItemFromCart,addItemToCart, removeItemFromCart  } = useContext(CartContext)
    const { name, imageUrl, price, quantity } = cartItem

    const addItemHandler = () => addItemToCart(cartItem)
    const removeItemHandler = () => removeItemFromCart(cartItem)
    const cleartItemHandler = () => clearItemFromCart(cartItem)

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={ imageUrl } alt={ `${ name }` } />
            </ImageContainer>
            <BaseSpan>{ name }</BaseSpan>
            <Quantity as='div'>
                <Arrow onClick={ removeItemHandler }>
                    &#10094;
                </Arrow>
                <Value>{ quantity }</Value>
                <Arrow onClick={ addItemHandler }>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{ price }</BaseSpan>
            <RemoveButton onClick={ cleartItemHandler }>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;