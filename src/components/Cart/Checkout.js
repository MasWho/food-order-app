import styles from './Checkout.module.css';
import React, { useRef, useState, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import CartContext from '../../store/cart-context';
import Spinner from '../../components/UI/Spinner';

const Input = React.forwardRef(({id, label, type, valid}, ref) => {

    let inputStyles = [styles.control];

    if(!valid) {
        inputStyles.push(styles.invalid);
    }

    return (
        <div className={inputStyles.join(" ")}>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} ref={ref} />
            {!valid && <p>{`Please enter a valid ${id}`}</p>}
        </div>
    );
});

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = ({onCancel, onSubmit}) => {

    const cartCtx = useContext(CartContext);

    const {loading, error, sendRequest} = useHttp();

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const postalRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const nameValue = nameRef.current.value;
        const streetValue = streetRef.current.value;
        const cityValue = cityRef.current.value;
        const postalValue = postalRef.current.value;

        const nameIsValid = !isEmpty(nameValue);
        const streetIsValid = !isEmpty(streetValue);
        const cityIsValid = !isEmpty(cityValue);
        const postalIsValid = !isEmpty(postalValue) && isFiveChars(postalValue);

        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postalCode: postalIsValid
        })

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

        if(!formIsValid) {
            return;
        }

        sendRequest(
            {
                url: "https://react-hook-update-74a30-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
                method: "POST",
                body: {
                    user: {
                        name: nameValue,
                        street: streetValue,
                        city: cityValue,
                        postalCode: postalValue
                    },
                    orderedItems: cartCtx.items
                }
            },
            () => onSubmit(true)
        );
    };

    let display;

    if(loading) {
        display = <Spinner />;
    }

    return (
        <form onSubmit={confirmHandler} className={styles.form}>
            <Input id='name' label="Your Name" type="text" ref={nameRef} valid={formInputsValidity.name} />
            <Input id='street' label="Street" type="text" ref={streetRef} valid={formInputsValidity.street} />
            <Input id='city' label="City" type="text" ref={cityRef} valid={formInputsValidity.city} />
            <Input id='postal' label="Postal Code" type="text" ref={postalRef} valid={formInputsValidity.postalCode} />
            <div className={styles.actions}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button type="submit" className={styles.submit}>Confirm</button>    
            </div>
        </form>
    )
};

export default Checkout;