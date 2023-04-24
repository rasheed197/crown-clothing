import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from './../shop-data.js';

export const CategoriesContext = createContext({  
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => { // Used in index.js
    const [categoriesMap, setCategoriesMap] = useState({})  // Used in shop.component.jsx

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);
            setCategoriesMap(categoryMap)
        }     
        getCategoriesMap();
    }, [])
    
    const value = { categoriesMap }
    return (<CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>)
}