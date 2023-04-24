// Used in authentication.component.jsx

import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from './sign-up-form.styles.jsx';


const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formFields;

    // console.log(formFields);

    const resetFormFields = () => {  // Clear form fields after creating user collection
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName }) // Add user to firebase collection
            resetFormFields();
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {  // Firebase Error Message.
                alert('Cannot create user, email already in use.'); 
            }
            // console.log('User creation encountered an error', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>

                <FormInput 
                    label='Display Name'
                    inputOptions = {{
                        type: 'text',
                        name: 'displayName',
                        onChange: handleChange,
                        value: displayName,
                        required: true,
                    }}
                />

                <FormInput 
                    label='Email'
                    inputOptions = {{
                        type: 'email',
                        name: 'email',
                        onChange: handleChange,
                        value: email,
                        required: true,
                    }}
                />

                <FormInput 
                    label='Password'
                    inputOptions = {{
                        type: 'password',
                        name: 'password',
                        onChange: handleChange,
                        value: password,
                        required: true,
                    }}
                />

                <FormInput 
                    label='Confirm Password'
                    inputOptions = {{
                        type: 'password',
                        name: 'confirmPassword',
                        onChange: handleChange,
                        value: confirmPassword,
                        required: true,
                    }} 
                />

                <Button type='submit'>Sign up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;