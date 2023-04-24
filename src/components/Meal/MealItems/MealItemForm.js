import React, { useRef, useState } from "react";
import classes from './MealItemForm.module.css'
import Input from "../../UI/Input";
const MealItemForm = (props) => {

    const amountInputRef = useRef();
    const [isValid, setIsValid] = useState(true);
    const FormSubmit = event =>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5){
            setIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return <form className={classes.form} onSubmit = {FormSubmit}>
        <Input label ="Amount" 
            ref = {amountInputRef} 
            input={{
            id : 'amount' + props.id,
            type : 'number',
            min : '1',
            max :'5',
            step : '1',
            defaultValue : '1',
        }}/>
        <button>+ADD</button>
        {!isValid && <p>Please enter a valid amount(1- 5)</p>}
    </form>
}

export default MealItemForm ;