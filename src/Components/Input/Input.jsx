import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { FormContext } from "../../providers/FormContext";
import './Input.css';

function Input( {type, id, label, checkOnBlur, placeholder}, ref ){
    
    const [text, setText] = useState("");

    const {formInput, setFormInput} =useContext(FormContext);              
                                                    // All the props we are passing with the value property 
                                                    // are accessible using this useContext function inside 
                                                    // an object.

    const [isValid, setIsValid] = useState(true);

    const [shake, setShake] = useState(false);

    //Introduce a local ref, local to component.
    const localRef = useRef(null);

    useEffect(() =>{
        setIsValid(true)
        setShake(false)
    }, [text])

    useImperativeHandle(ref, () => {
        return {
            //Return a custom object
            focus : () => localRef.current.focus(),
            setInvalid : () => setIsValid(false),
            something : () => console.log("Its custom ref"),
            shake : () => {
                setShake(true)
                setTimeout(() => setShake(false), 500);
            }
        }
    }, [])
    
    return (
        <>
            <input 
                className={`${(!isValid) ? "error-input" : ""} ${(shake) ? 'shake' : ''}`}
                ref={localRef}
                type={type} 
                onBlur={checkOnBlur}
                id={id} 
                value={text}
                placeholder={placeholder}
                onChange={(e) => {
                        setText(e.target.value);
                        setFormInput({...formInput, [label] : e.target.value});
                    }
                }
            />

            <span> {(!isValid) ? `${label} is invalid` : ''} </span>
        </>
    )
}

export default React.forwardRef(Input);