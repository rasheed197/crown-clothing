// Used in App.js
import { Routes, Route } from 'react-router-dom'
// You cannot use a Route component unless its immediate parent is a Routes Component
import Category from '../category/category.component'

import CategoriesPreview from '../categories-preview/categories-preview.component'

const Shop = () => {
    return (
        <Routes>
            <Route index element={ <CategoriesPreview /> } /> 
            <Route path=':category' element={ <Category /> } /> 
        </Routes>
    )
}

export default Shop;