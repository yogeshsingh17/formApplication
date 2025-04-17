import { useState } from "react";
import validatePassword from "../../Helper/passwordValidator";
import validateEmail from "../../Helper/emailValidator";

function Form(){

    const [formValues, setFormValues] = useState({
        email : '',
        password : '',
    })

    const handleValidatePassword = () => {
        const password = formValues.password;
        const resultPassword = validatePassword(password);
        if(!resultPassword.isValid){
            console.log("Password doesn't contain required parameters");
            document.getElementById('password-Input').focus();              //This is the worst case in react where we are using dom manipulation using document.getElementById to focus on the error, this is not a recommended way to use react.
            // return false;
        }
        // return true;
    };

    const handleValidateEmail = () => {
        const email =formValues.email;
        const resultEmail = validateEmail(email);
        
        if(!resultEmail.isValid){
            console.log("Email does not contain required parameters.");
            document.getElementById('email-Input').focus();                 //This is the worst case in react where we are using dom manipulation using document.getElementById to focus on the error, this is not a recommended way to use react.
            // return false;
        }
        // return true;
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();             //To prevent form from refreshing again and again.
        const isPasswordValid = handleValidatePassword();
        if(!isPasswordValid){
            // console.log("Password is invalid");

            return;
        }

        const isEmailValid = handleValidateEmail();
        if(!isEmailValid){
            console.log("Email is invalid");
            return;
        }

        console.log('The valid email and password is:',formValues);
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="">
                        Email :
                    </label>
                    <input 
                        id="email-Input"
                        type="email" 
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