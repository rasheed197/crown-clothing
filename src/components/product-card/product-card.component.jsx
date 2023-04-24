// rendered in category-preview.component.jsx

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import Button, { BUTTON_TYPE_CLASSES } from './../button/button.component'
import { CardContainer, Footer, Name, Price } from './product-card.styles.jsx';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext)

  const addProductToCart = () => {
    addItemToCart({ ...product })
  }

  return (
    <CardContainer>
      <img src={ imageUrl } alt={`${name}`} />
      <Footer>
        <Name>{ name }</Name>
        <Price>{ price }</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={ addProductToCart }>Add to cart</Button>
    </CardContainer>
  )
}

export default ProductCard;