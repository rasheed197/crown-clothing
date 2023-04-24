//  Used in shop component.

import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, CategoryTitle } from './category.styles.jsx';

const Category = () => {
    const { category } = useParams();
    // useParams() is used to retrieve route parameters from the functional component rendered by the matching route.
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);
    // Note that categoriesMap is an empty object when this component mount for the first time 
    // because CategoriesContext is still trying to fetch the data asynchronously from firestore. Hence products
    // state will be an empty object by default.

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{ category.toLocaleUpperCase() }</CategoryTitle>
            <CategoryContainer>
                {
                    products && products.map((product) => <ProductCard key={ product.id } product={ product } /> )
                }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category;