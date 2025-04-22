import { useRef, useState } from "react";
import validateEmail from "../../Helper/emailValidator";
import validatePassword from "../../Helper/passwordValidator";


function Form(){

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [formValues, setFormValues] = useState({
        email : '',
        password : '',
    })

    const handleValidateEmail = () => {
        const email =formValues.email;
        const resultEmail = validateEmail(email);
        
        if(!resultEmail.isValid){
            emailRef.current.focus();                           // This line will help us to focus on the part where the error occured.
            console.log("Email does not contain required parameters.");
            return false;
        }
        return true;
    }

    const handleValidatePassword = () => {
        const password = formValues.password;
        const resultPassword = validatePassword(password);

        if(!resultPassword.isValid){
            passwordRef.current.focus();
            console.log("Password doesn't contain required parameters");
            return false;
        }
        return true;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();             //To prevent form from refreshing again and again.
        
        const isEmailValid = handleValidateEmail();
        const isPasswordValid = handleValidatePassword();
        
        if(!isEmailValid || !isPasswordValid){
            return;
        }

        console.log('The valid email and password is:',formValues);
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>
                        Email :
                    </label>
                    <input 
                        id="email-Input"
                        type="text" 
                        ref={emailRef}
                        value={formValues.email}
                        onChange={(event) => {setFormValues({... formValues, email: event.target.value})}}
                    />
                </div>

                <div>
                    <label htmlFor="">
                        Password :
                    </label>
                    <input 
                        id="password-Input"
                        type="password" 
                        ref={passwordRef}
                        value={formValues.password} 
                        onChange={(event) => setFormValues({... formValues, password: event.target.value}) }
                    />
                </div>

                <div>
                    <input type="submit" />
                </div>
            </form>
        </>
    )
}

export default Form;