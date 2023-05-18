import classes from './MealsItems.module.css'
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/store-context';
const MealsItems = (props) =>{
    const Cartctx = useContext(CartContext);
    
    const price = `$${props.price.toFixed(2)}` ;

    const AddToCartHandler = amount => {
        console.log(amount);
        Cartctx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    }

    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div><MealItemForm id = {props.id} onAddToCart = {AddToCartHandler}/></div>
        </li>
    );
}

export default MealsItems;