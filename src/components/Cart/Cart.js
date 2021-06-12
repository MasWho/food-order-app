import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import {useContext, useState} from 'react';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = ({onClose}) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `ZAR ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const cancelOrderHandler = () => {
        setIsCheckout(false);
    };

    const cartItems = cartCtx.items.map(item => 
        <CartItem 
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
    );

    const modalActions = (
        !isCheckout && (
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={() => onClose(false)}>Close</button>
                {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
            </div>
        )
    );

    return (
        <Modal onClickBackdrop={onClose}>
            <ul className={styles['cart-items']}>{cartItems}</ul>
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={cancelOrderHandler} onSubmit={didSubmit} />}
            {modalActions}
        </Modal>
    );
};

export default Cart;