import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const ING_PRICE = {
    salad: 0.3,
    meat: 1.3,
    cheese: 0.7,
    bacon: 0.9
}

class BurgerBuilder extends Component{

    state = {
        ingredient : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 4,
        purchaseable: false,
        summary: false
    }

    updatePurchaseState (ingredient){
       const sum = Object.keys(ingredient)
        .map(igKey =>{
            return ingredient[igKey];
        }).reduce((sum, el)=>{
            return sum + el;
        })
        this.setState({purchaseable: sum > 0})
    }

    addIngHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const newCount = oldCount + 1;
        const updatedIng = {
            ...this.state.ingredient
        }
        updatedIng[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + ING_PRICE[type];
        this.setState({ingredient: updatedIng, totalPrice: newPrice})
        this.updatePurchaseState(updatedIng);
    }

    removeIngHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        if (oldCount <= 0){
            return;
        }
        const newCount = oldCount - 1;
        const updatedIng = {
            ...this.state.ingredient
        }
        updatedIng[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - ING_PRICE[type];
        this.setState({ingredient: updatedIng, totalPrice: newPrice})
        this.updatePurchaseState(updatedIng);
    }

    summaryHandler = () => {
        this.setState({summary : true})
    }

    purchaseCancelHandler = () => {
        this.setState({summary : false})
    }

    continueHandler = () => {
        alert('Continueing to check out!')
    }

    render(){
        const disableInfo = {
            ...this.state.ingredient
        }
        for (let key in disableInfo){
            disableInfo[key] =  disableInfo[key] <= 0
        }
        return(
            <Aux>
                <Model show = {this.state.summary}
                       modelClosed = {this.purchaseCancelHandler}>
                    <OrderSummary ingredient = {this.state.ingredient}
                                  cancelPurchase = {this.purchaseCancelHandler}
                                  continuePurchase ={this.continueHandler}/>
                </Model>
                <Burger ingredient = {this.state.ingredient}/>
                <BuildControls
                purchaseable = {this.state.purchaseable}
                igAdded = {this.addIngHandler}
                igMinus = {this.removeIngHandler}
                ordered = {this.summaryHandler}
                disabled = {disableInfo}
                price ={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;