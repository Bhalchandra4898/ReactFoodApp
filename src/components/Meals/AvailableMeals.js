import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect } from "react";
import { useState } from "react";

const AvailableMeals = () => {
  const [mealsDB, setMealsDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const getMeals = async () => {
      try {
        const response = await fetch(
          "https://react-edu-d2b1a-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        );

        if (!response.ok) {
          throw new Error("Not able to fetch meals database");
        }

        const data = await response.json();

        let meals = [];
        for (const key in data) {
          meals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMealsDB(meals);
        setIsLoading(false);
      } catch (error) {
        setHasError(error.message);
        setIsLoading(false);
      }
    };
    getMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className={classes.mealsError}>
        <p>{hasError}</p>
      </section>
    );
  }

  const mealItems = mealsDB.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
