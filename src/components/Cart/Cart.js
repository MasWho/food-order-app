import styles from './Cart.module.css';
import Modal from '../UI/Modal';

const Cart = ({onClose}) => {

    const cartItems = [
        {id: 'c1', name: 'Sushi', amount: 2, price: 12.99}
    ].map(item => <li>{item.name}</li>);

    return (
        <Modal onClickBackdrop={onClose}>
            <ul className={styles['cart-items']}>{cartItems}</ul>
            <div>
                <span>Total Amount</span>
                <span>35.25</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={() => onClose(false)}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;