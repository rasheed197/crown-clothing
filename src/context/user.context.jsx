import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// import SHOP_DATA from './../shop-data.json'

// As the actual value you want to access
export const UserContext = createContext({ // Initialize createContext() and pass a default  state value
    currentUser: null,
    setCurrentUser: () => null,
});

// For every context you create there is a '.Provider' the '.Provider' is the component 
// that  will wrap arround any other component that needs access to the values inside
export const UserProvider = ({ children }) => {  // Used in index.js
    const [ currentUser, setCurrentUser ] = useState(null)
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            // console.log(user);
            if (user) {
                createUserDocumentFromAuth(user); // Creat our Users collection
            }
            setCurrentUser(user);
        })
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

