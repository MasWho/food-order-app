import styles from './HeaderCartButton.module.css';
import CartIcon from '../../Cart/CartIcon';
import CartContext from '../../../store/cart-context';

import {useContext, useEffect, useState} from 'react';

const HeaderCartButton = ({onClick}) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

    const cartCtx = useContext(CartContext);

    const btnStyles = [styles.button, btnIsHighlighted ? styles.bump : ""];

    const numberOfCartItems = cartCtx.items.reduce((acc, item) => {
        return acc + item.amount;
    }, 0);

    const {items} = cartCtx;

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items])

    return (
        <button className={btnStyles.join(" ")} onClick={() => onClick(true)}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;