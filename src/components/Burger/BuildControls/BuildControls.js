import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
        {label : 'Cheese', type : 'cheese'},
        {label : 'Salad', type : 'salad'},
        {label : 'Meat', type : 'meat'},
        {label : 'Bacon', type : 'bacon'}
]

const buildControls = (props) =>(  
        <div className={styles.BuildControls}>
                <p>Burger Price: {props.price.toFixed(2)}</p>
                {controls.map(ctrl =>(
                        <BuildControl
                                key = {ctrl.label}
                                label = {ctrl.label}
                                added = {() => props.igAdded(ctrl.type)}
                                removed = {() => props.igMinus(ctrl.type)}
                                disabled = {props.disabled[ctrl.type]}>
                        </BuildControl>
                ))}
                <button className = {styles.OrderButton}
                        disabled = {!props.purchaseable}
                        onClick ={props.ordered}>
                        Order Now
                </button>
        </div>   
)

export default buildControls;
