import React, {Fragment} from "react";
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";
const Header = props => {

    return <Fragment>
        <header className={classes.header}>
            <h1>React Meal</h1>
            <HeaderCartButton onClick = {props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>       {/*way to write css classes with '-'*/}
            <img src={mealsImage} alt ="A table with full of meals" />
        </div>
    </Fragment>
};

export default Header;