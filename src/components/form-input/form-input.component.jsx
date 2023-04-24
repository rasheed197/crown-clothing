// Used in sign-in-form.component.jsx
// Used in sign-up-form.component.jsx

import { FormInputLabel, Input, Group } from './form-input.styles.jsx';

const FormInput = ({ label, inputOptions }) => {
    return (
        <Group>
            <Input { ...inputOptions } />
            {label && (// If label props exist, render the label.
                <FormInputLabel shrink={ inputOptions.value.length }> 
                
                    { label }  
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;