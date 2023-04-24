// Used in shop.component.jsx

import { Fragment, useContext } from "react";

import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return (
        <Fragment>
            {/* Object.keys() returns an Array Iterator object with the keys of an object: */}
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                })   
            }
        </Fragment>
    )
}


export default CategoriesPreview;