import {useReducer} from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {

    if(action.type === "ADD_ITEM") {
        // updatedItems = [...state.items];
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItem, updatedItems;
        if(existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItem = {...action.payload};
            updatedItems = state.items.concat(action.payload);
        }

        return {
            items: updatedItems,
            totalAmount: state.totalAmount + action.payload.amount * action.payload.price
        };
    }

    if(action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        // Remove entire item from array
        if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.payload);
        } else {
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = {...existingCartItem, amount: existingCartItem.amount - 1}
        }

        return {
            items: updatedItems,
            totalAmount: state.totalAmount - existingCartItem.price
        };
    }

    return defaultCartState;
};

const CartContextProvider = ({children}) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchCartAction({
            type: "ADD_ITEM",
            payload: item
        })
    };
    
    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            payload: id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;