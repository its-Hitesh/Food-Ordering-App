import classes from './AvaliableMeals.module.css'
import Card from '../UI/Card';
import MealsItems from './MealItems/MealsItems';
const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

  const AvaliableMeals = () => {
    
    const mealList = DUMMY_MEALS.map((meal) => (
        <MealsItems id = {meal.id} key ={meal.id} meal ={meal}/>
        ));
    
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