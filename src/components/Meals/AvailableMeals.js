import { useState, useEffect } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import Spinner from "../../components/UI/Spinner";

const AvailableMeals = () => {
	const [meals, setMeals] = useState();

	const { loading, error, sendRequest } = useHttp();

	useEffect(() => {
		const transformMealsData = (data) => {
			let mealsArray = Object.keys(data).map((id) => {
				return {
					id: id,
					name: data[id].name,
					description: data[id].description,
					price: data[id].price,
				};
			});
			setMeals(mealsArray);
		};

		sendRequest({ url: "https://react-hook-update-74a30-default-rtdb.europe-west1.firebasedatabase.app/meals.json" }, transformMealsData);
	}, [sendRequest]);

	let content;
	
	if(meals && meals.length && !loading) {
		content = (
			<ul>
				{
					meals.map(meal => 
						<MealItem 
							name={meal.name} 
							key={meal.id} 
							id={meal.id} 
							description={meal.description} 
							price={meal.price} 
						/>
					)
				}
			</ul>
		);
	}

	if(error) {
		content = (
			<p style={{textAlign: 'center'}}>{error}</p>
		);
	}

	if(loading) {
		content = <Spinner />;
	}

	return (
		<section className={styles.meals}>
			<Card>
				{content}
			</Card>
		</section>
	);
};

export default AvailableMeals;
