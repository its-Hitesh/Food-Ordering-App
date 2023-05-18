import classes from './AvaliableMeals.module.css'
import Card from '../UI/Card';
import MealsItems from './MealItems/MealsItems';
import { useEffect, useState } from 'react';

const AvaliableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [httperror, setHttpError] = useState();

    useEffect(() => {
      const fetchMeals = async() => {
        const response = await fetch('https://learnreact-e25da-default-rtdb.firebaseio.com/Meals.json');
        if(!response.ok){
          throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        const loadedItems = [];
        for(const key in responseData) {
          loadedItems.push({
            id : key,
            name : responseData[key].name,
            description : responseData[key].description,
            price : responseData[key].price,
          });
        }
        setLoading(false);
        setMeals(loadedItems);
      }
        fetchMeals().catch((error) => {
          setLoading(false);
          setHttpError(error.message);
        });
    },[]);

    
    const mealList = meals.map((meal) =>(
      <MealsItems 
      key= {meal.id}
      id = {meal.id} 
      name = {meal.name}
      description = {meal.description}
      price = {meal.price}
      /> 
      ));
    
    if(isLoading){
      return<section className={classes.meals}>
        <p className ={classes.MealLoading}>Loading...</p>
      </section>
    }

    if(httperror){
      return<section className={classes.meals}>
        <p className ={classes.MealError}>{httperror}</p>
      </section>
    }
      
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>   
        </section>
    );
  }

  export default AvaliableMeals;