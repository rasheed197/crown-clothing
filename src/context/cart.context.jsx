// 'CartContext' used in:
// 1. product-card.component.jsx
// 2. cart-dropdown.component.jsx
// 3. cart-icon.component.jsx


import { createContext, useEffect, useState } from "react";

const addCartItems = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
            (cartItem) => cartItem.id === productToAdd.id
        );

    // If found increment quantity
    if (existingCartItem) { // map through the cartItems and return a new array
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    // return new array with modified cartItems/ new cart item
    return [ ...cartItems, { ...productToAdd, quantity: 1 } ];

}

const removeCartItems = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
   
    // Check if quantity is equal to 1, if it is remove that item from the cart.
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // Return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        )
}

const clearCartItems = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({ 
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    cartTotalPrice: 0,
});


export const CartProvider = ({ children }) => {  // Used in index.js
    const [ isCartOpen, setIsCartOpen ] = useState(false) // Used in cart-icon.component.jsx
    const [ cartItems, setCartItems ] = useState([]); // Used in cart-dropdown.component.jsx, checkout.component.jsx, 
    const [ cartCount, setCartCount ] = useState(0); // Used in cart-icon.component.jsx
    const [ cartTotalPrice, setCartTotalPrice ] = useState(0); // Used in checkout.component.jsx, 

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotalPrice(newCartTotalPrice)
    }, [cartItems])
    
    // console.log(cartItems)

    const addItemToCart = (productToAdd) => {  // Used in product-card.component.jsx, checkout.component.jsx
        setCartItems(addCartItems(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {  // Used in checkout.component.jsx
        setCartItems(removeCartItems(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {  // Used in checkout.component.jsx
        setCartItems(clearCartItems(cartItems, cartItemToClear))
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart, 
        clearItemFromCart,
        cartTotalPrice,
    };
    
    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}