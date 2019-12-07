import React from 'react';
import classes from './Burger.css'
import BurgerIgnredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  
    let transformedIngredients = Object.keys(props.ingredients).map(ingredientKey =>{
        return [...Array(props.ingredients[ingredientKey])].map((_,i) =>{
          return  <BurgerIgnredient key = {ingredientKey + i} type={ingredientKey} />;
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
 
    if(transformedIngredients.length === 0){
    transformedIngredients = <p> Pls add some ingredients</p>
  }
    return (
        <div className={classes.Burger}>
            <BurgerIgnredient type="bread-top" />
           {transformedIngredients}
            <BurgerIgnredient type="bread-bottom" />
        </div>
    );
};

export default burger;