import React, {useRef, useState} from 'react';
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = ({id, onAddToCart}) => {
	const [amountIsValid, setAmountIsValid] = useState(true);

	const amountInputRef = useRef();

	const submitHandler = e => {
		e.preventDefault();
		const enteredValue = amountInputRef.current.value;

		if(enteredValue.trim().length === 0 || +enteredValue < 1 || +enteredValue > 5) {
			setAmountIsValid(false);
			return;
		}

		onAddToCart(+enteredValue);
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: `amount_${id}`,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
