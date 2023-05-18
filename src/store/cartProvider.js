import { useReducer } from "react";
import CartContext from "./store-context"

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const CartReducer = (state, action ) =>{                               // get state(latest snapshot) and action from react 
    if(action.type === 'ADD'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount ;
        return{
            items : updatedItems,
            totalAmount : updatedTotalAmount
        };
    }
    if(action.type === 'DELETE'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => action.id !== item.id);
        }
        else{
            const updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount - 1
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return{
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    if(action.type === 'CLEAR'){
        return defaultCartState ;
    }
    return defaultCartState;
};

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(CartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'DELETE', id: id});
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    };

    const cartContext ={
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value ={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;