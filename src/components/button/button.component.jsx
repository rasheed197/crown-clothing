// Used in sign-in-form.component.jsx
// Used in sign-up-form.component.jsx
// Cart-dropdown.component.jsx
// Used in product-card.component.jsx

import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles.jsx'

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
};

// getButton map through the object and return the value whose key match ' buttonType'
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => 
({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton { ...otherProps }>{ children }</CustomButton>
}

export default Button;