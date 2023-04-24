// Used in authentication.component.jsx

import { useState } from "react";
import { 
    signInWithGoolePopup,  
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonContainer } from './sign-in-form.styles.jsx';


const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password } = formFields;

    // console.log(formFields);

    const resetFormFields = () => {  // Clear form fields after creating user collection
        setFormFields(defaultFormField);
    };

    const signInWithGoogle = async () => {
        await signInWithGoolePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            // console.log(user);
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>

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
                <ButtonContainer>
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType={ BUTTON_TYPE_CLASSES.google } onClick={ signInWithGoogle }>Google Sign in</Button>
                    {/* 
                        By defult, button in forms have the type submit so we changed this to  type='button' because 
                        we don't want the form to submit when we click on it. We just want to load the signInWithGooglePopUp.
                    
                    */}
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;