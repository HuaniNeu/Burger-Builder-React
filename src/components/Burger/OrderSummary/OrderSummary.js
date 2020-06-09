import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary =(props) =>{
    const IgSummary = Object.keys(props.ingredient)
        .map(key=>{
            return <li>
                        <span style={{textTransform: "capitalize"}}>{key}</span>
                        : {props.ingredient[key]}
                   </li>
        })

    return (
    <Aux>
        <h2>Your Order</h2>
        <p>You have created a burger with following ingredient.</p>
        <ul>
            {IgSummary}
        </ul>
        <p>Continue to Checkout?</p>
        <Button btnType ="Danger" clicked ={props.cancelPurchase}>Cancel</Button>
        <Button btnType ="Success" clicked ={props.continuePurchase}>Continue</Button>

    </Aux>
    )
    }

export default orderSummary;