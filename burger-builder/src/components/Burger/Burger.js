import React from 'react';
import classes from './Burger.css'
import BurgerIgnredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  
    const transformedIngredients = Object.keys(props.ingredients).map(ingredientKey =>{
        return [...Array(props.ingredients[ingredientKey])].map((_,i) =>{
          return  <BurgerIgnredient key = {ingredientKey + i} type={ingredientKey} />;
        });
    });
  
    return (
        <div className={classes.Burger}>
            <BurgerIgnredient type="bread-top" />
           {transformedIngredients}
            <BurgerIgnredient type="bread-bottom" />
        </div>
    );
};

export default burger;