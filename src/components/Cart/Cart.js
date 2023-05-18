import classes from './Cart.module.css'
import React from 'react';
import Modal from '../UI/Modal';
import {useContext, useState} from 'react';
import CartContext from '../../store/store-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = props => {
    const [isSubmittingState, setIsSubmittingState] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const CartCtx = useContext(CartContext);
    const [onOrder, setOnOrder] = useState(false);
    const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;

    const hasItems = CartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        CartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        CartCtx.addItem({...item, amount:1});
    };

    const onClickHandler = () => {
        setOnOrder(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmittingState(true);
        await fetch('https://learnreact-e25da-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: CartCtx.items 
            })
        });
        setIsSubmittingState(false);
        setDidSubmit(true);
        CartCtx.clearCart();
    };

    const cartItems = <ul className={classes['cart-items']}>{CartCtx.items.map(
        item =><CartItem key = {item.id} 
        name = {item.name} 
        amount = {item.amount} 
        price ={item.price} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd ={cartItemAddHandler.bind(null, item)}
        />)}
    </ul>;

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <spam>Total Amount</spam>
                <spam>{totalAmount}</spam>
            </div>
            {onOrder && <Checkout onConfirm = {submitOrderHandler} cancel = {props.onClose}/>}
            {!onOrder && <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={onClickHandler}>Order</button>}
            </div>}
        </React.Fragment>
    );

    const isSubmmiting = <p>Making your order...</p>;

    const didSubmitmodal = (
        <React.Fragment> 
            <p>Your order has been submitted</p>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>    
    );

    return <Modal onClose = {props.onClose}>
        {!isSubmittingState && !didSubmit && cartModalContent}
        {isSubmittingState && isSubmmiting}
        {didSubmit && didSubmitmodal}
    </Modal>
}   

export default Cart;