import classes from './HeaderCartButton.module.css'
import CardIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/store-context';
const HeaderCartButton = props => {

    const CartCxt = useContext(CartContext);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const NumberOfCartItems = CartCxt.items.reduce((curNumber, item) =>{
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    const { items } = CartCxt;

    useEffect(() => {
        if (items.length === 0) {
          return;
        }
        setBtnIsHighlighted(true);
    
        const timer = setTimeout(() => {
          setBtnIsHighlighted(false);
        }, 300);
    
        return () => {
          clearTimeout(timer);
        };
      }, [items]);

    return (
        <button className={btnClasses} onClick = {props.onClick}>
            <span className = {classes.icon}>
                <CardIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{NumberOfCartItems}</span>
        </button>
    );

}   


export default HeaderCartButton ;