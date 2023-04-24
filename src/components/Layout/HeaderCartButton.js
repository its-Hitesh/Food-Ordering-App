import classes from './HeaderCartButton.module.css'
import CardIcon from '../Cart/CartIcon'
import { useContext } from 'react';
import CartContext from '../../store/store-context';
const HeaderCartButton = props => {

    const CartCxt = useContext(CartContext);

    const NumberOfCartItems = CartCxt.items.reduce((curNumber, item) =>{
        return curNumber + item.amount;
    }, 0);

    return (
        <button className={classes.button} onClick = {props.onClick}>
            <span className = {classes.icon}>
                <CardIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{NumberOfCartItems}</span>
        </button>
    );

}   


export default HeaderCartButton ;