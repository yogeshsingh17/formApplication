import Input from "../Input/Input";
import { FormContext } from "../../providers/FormContext";
import { useContext, useRef, useState } from "react";
import './Form.css';
import validateEmail from "../../Helper/emailValidator";
import validatePassword from "../../Helper/passwordValidator";


function Form(){

    const {formInput} = useContext(FormContext);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const addressRef = useRef(null);

    const [step, setStep] = useState(1);

    const handleFormSubmit = (event) => {
        event.preventDefault();             // To prevent form from refreshing again and again.
        console.log(formInput);             // We have access to formInput, that means validations can occur
        //console.log("The value of emailRef is :",emailRef);
        //if(emailRef.current)                // We have added if statement because without it the focus was working even when no value was added to the emailRef
        
        handleInvalidEmail();
        handleInvalidPassword();
    }

    const handleInvalidEmail = () => {
        const {isValid : isEmailValid} = validateEmail(formInput.email);

        if(!isEmailValid){
            emailRef.current.focus();
            emailRef.current.setInvalid();
            emailRef.current.shake();
        }
    }

    const handleInvalidPassword = () => {
        const {isValid : isPasswordValid} = validatePassword(formInput.password);

        if(!isPasswordValid){
            passwordRef.current.focus();
            passwordRef.current.setInvalid();
            passwordRef.current.shake();
        }
    }

    if(step == 1){
        return (
            <>
                <form onSubmit={handleFormSubmit} noValidate>
                    <div className="wrapper email-input-wrapper">
                        <label>
                            Email :
                        </label>
                        <Input 
                            id="email-Input"
                            type="text" 
                            // ref={emailRef}
                            // value={formValues.email}
                            // onChange={(event) => {setFormValues({... formValues, email: event.target.value})}}
                            label = "email"
                            placeholder="email"
                            ref = {emailRef}
                            key={1}
                            checkOnBlur={handleInvalidEmail}
                        />
                    </div>
    
                    <div className="wrapper password-input-wrapper">
                        <label htmlFor="">
                            Password :
                        </label>
                        <Input 
                            id="password-Input"
                            type="password"
                            // ref={passwordRef}
                            // value={formValues.password} 
                            // onChange={(event) => setFormValues({... formValues, password: event.target.value})}
                            label = "password"
                            placeholder="password"
                            ref = {passwordRef}
                            key={2}
                            checkOnBlur={handleInvalidPassword}
                        />
                    </div>
    
                    <div className="wrapper button-input-wrapper">
                        <input type="submit" />
                    </div>

                    <button onClick={() => {
                        setStep(step + 1)
                    }}>
                        Next
                    </button>
                </form>
            </>
        )
    }else if(step == 2){
        return (
            <>
                <form onSubmit={handleFormSubmit} noValidate>
                    <div className="wrapper email-input-wrapper">
                        <Input 
                            id="username-Input"
                            type="text"
                            label = "username"
                            placeholder="username"
                            ref = {usernameRef}
                            key={3}
                            checkOnBlur={() => {console.log("Empty")}}
                        />
                    </div>
    
                    <div className="wrapper button-input-wrapper">
                        <input type="submit" />
                    </div>
                </form>

                <button onClick={() => {
                    setStep(step - 1)
                }}>
                    Prev
                </button>

                <button onClick={() => {
                    setStep(step + 1)
                }}>
                    Next
                </button>
            </>
        )
    }else if(step == 3){
        return (
            <>
                <form onSubmit={handleFormSubmit} noValidate>
                    <div className="wrapper email-input-wrapper">
                        <Input 
                            id="address-Input"
                            type="text" 
                            label = "address"
                            placeholder="address"
                            ref = {addressRef}
                            key={4}
                            checkOnBlur={handleInvalidEmail}
                        />
                    </div>
    
                    <div className="wrapper button-input-wrapper">
                        <input type="submit" />
                    </div>
                </form>

                <button onClick={() => {
                    setStep(step - 1)
                }}>
                    Prev
                </button>
            </>
        )
    }

}

export default Form;