// Used in shop.component.jsx in Routes

import ProductCard from '../product-card/product-card.component';

import {CategoryPreviewContainer, Preview, Title} from './category-preview.styles.jsx'

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>
                    <span>{ title.toUpperCase() }</span>
                </Title>
            </h2>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4) // We use _ because we don't need the callback but the index. 
                        // Return Product whose index < 4 
                        .map((product) => 
                        <ProductCard key={ product.id } product={ product } />)
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;