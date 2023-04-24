import classes from './MealsItems.module.css'
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/store-context';
const MealsItems = (props) =>{
    const Cartctx = useContext(CartContext);
    
    const price = `$${props.meal.price.toFixed(2)}` ;

    const AddToCartHandler = amount => {
        console.log(amount);
        Cartctx.addItem({
            id: props.id,
            name: props.meal.name,
            amount: amount,
            price: props.meal.price,
        });
    }

    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.meal.name}</h3>
                <div className={classes.description}>{props.meal.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div><MealItemForm id = {props.meal.id} onAddToCart = {AddToCartHandler}/></div>
        </li>
    );
}

export default MealsItems;