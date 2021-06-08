import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = ({ name, description, price }) => {
	const priceToDisplay = `${price.toFixed(2)}`;

	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<div className={styles.description}>{description}</div>
				<div className={styles.price}>{priceToDisplay}</div>
			</div>
            <div>
				<MealItemForm />
            </div>
		</li>
	);
};

export default MealItem;
