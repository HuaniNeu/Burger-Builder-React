import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-links';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const ING_PRICE = {
    salad: 0.3,
    meat: 1.3,
    cheese: 0.7,
    bacon: 0.9
}

class BurgerBuilder extends Component{

    state = {
        ingredient : null,
        totalPrice : 4,
        purchaseable: false,
        summary: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burgerbuilderreact-bcb85.firebaseio.com/ingredient.json')
            .then(response=>{
                this.setState({ingredient: response.data})
            })
            .catch(error=>{
                this.setState({error: true})
            })
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

        const priceDeduction = ING_PRICE[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
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
        this.setState({loading: true})
        let order = {
            ingredient : this.state.ingredient,
            price : this.state.totalPrice,
            customer : {
                name: "Huani",
                address : 'hahah street Aus'
            },
            delivery: 'uber'
        }
        axios.post('/orders.json', order)
            .then(response=>{ this.setState({loading: false, summary: false})})
            .catch(error=>{ this.setState({loading: false, summary: false})})
    }

    render(){
        const disableInfo = {
            ...this.state.ingredient
        }
        for (let key in disableInfo){
            disableInfo[key] =  disableInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error? <p>ingredients can't be loaded</p>:<Spinner/>

        if(this.state.ingredient){
            burger = (
            <Aux>
                <Burger ingredient = {this.state.ingredient}/>
                <BuildControls
                purchaseable = {this.state.purchaseable}
                igAdded = {this.addIngHandler}
                igMinus = {this.removeIngHandler}
                ordered = {this.summaryHandler}
                disabled = {disableInfo}
                price ={this.state.totalPrice}/>
            </Aux>
            )

            orderSummary =  <OrderSummary ingredient = {this.state.ingredient}
            payment = {this.state.totalPrice}
            cancelPurchase = {this.purchaseCancelHandler}
            continuePurchase ={this.continueHandler}/>
        }

        if (this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>
                <Model show = {this.state.summary}
                       modelClosed = {this.purchaseCancelHandler}>
                   {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);