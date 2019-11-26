import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'
const orderSummary = (props) => {
    const ingredientSummrary = Object.keys(props.ingredients)
    .map(key => {
            return (<li key={key}><span style={{textTransform: 'capitalize'}}>{key}:</span> {props.ingredients[key]}</li>);
    });
        return(
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummrary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button buttonType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button buttonType="Success" clicked={props.purchaseContinued} >CONTINUE</Button>
            </Auxiliary>
        )
};

export default orderSummary;