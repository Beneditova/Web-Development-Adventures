import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(ingredientKey =>{
            return ingredients[ingredientKey]
        })
        .reduce((sum, el) => {
        return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    addIgnredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () =>{
        this.setState({ loading: true});
        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kris',
                address: {
                    street: 'TestStreet',
                    zipCode: '4001',
                    country: 'Bulgaria'
                },
                email: 'test@email.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
             this.setState({ loading: true, purchasing: false})
            })
        .catch(error=> {
            this.setState({ loading: true, purchasing: false})
           });
    }

    removeIgnredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
      
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
      
        let orderSummary = <OrderSummary 
        ingredients={this.state.ingredients} 
        purchaseCancelled ={this.purchaseCancelHandler}
        purchaseContinued = {this.purchaseContinueHandler}
        price={this.state.totalPrice}
        />;
        
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
      
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded = {this.addIgnredientHandler}
                    ingredientRemoved = {this.removeIgnredientHandler}
                    disabled = {disableInfo}
                    purchasable = {this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price = {this.state.totalPrice} />
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);