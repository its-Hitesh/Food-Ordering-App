import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim().length === 0;
const isNotSixChar = (value) => value.trim().length !== 6;

const Checkout = (props) => {
    const [formValidityCheck, setFormValidityCheck] = useState({
        name: true, street: true, city: true, postalCode: true
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredname = nameInputRef.current.value;
        const enteredstreet = streetInputRef.current.value;
        const enteredcity = cityInputRef.current.value;
        const enteredpostal = postalInputRef.current.value;

        
        const isValidName = !isEmpty(enteredname);
        const isValidStreet = !isEmpty(enteredstreet);
        const isValidCity = !isEmpty(enteredcity);
        const isValidPostal = !isNotSixChar(enteredpostal);
        
        setFormValidityCheck({
            name: isValidName, street: isValidStreet, city: isValidCity, postalCode: isValidPostal 
        });

        const isFormValid = isValidName && isValidCity && isValidStreet && isValidPostal;

        if(!isFormValid){
            return ;
        }

        props.onConfirm ({
            name: enteredname, street: enteredstreet, city: enteredcity, postalCode:enteredpostal
        });
    };    

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formValidityCheck.name ? '' : classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {!formValidityCheck.name && <p>Enter name</p>}
        </div>
        <div className={`${classes.control} ${formValidityCheck.street ? '' : classes.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
            {!formValidityCheck.street && <p>Enter street name</p>}
        </div>
        <div className={`${classes.control} ${formValidityCheck.postalCode ? '' : classes.invalid}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalInputRef}/>
            {!formValidityCheck.postalCode && <p>Enter 6 digit postal code</p>}
        </div>
        <div className={`${classes.control} ${formValidityCheck.city ? '' : classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formValidityCheck.city && <p>Enter city name</p> }
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.cancel}>
            Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
        </div>
        </form>
    );
}

export default Checkout;