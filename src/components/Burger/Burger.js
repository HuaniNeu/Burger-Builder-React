import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>{

    //change ingredient state from cheese: 2 to [cheese, cheese]
    //convery ingredient obj to array 
    //map the arrIg to array size of its properties Ouput: Array[2] for cheese, Array[1] for salad
    //return BurgerIngredient based on arrLen

    let arrIg = Object.keys(props.ingredient).map(igKey =>{
        return [...Array(props.ingredient[igKey])]
    .map(
        (_, i) =>{
            return <BurgerIngredient key ={igKey+i}
                                    type = {igKey}/>
        })
    }).reduce((arr, el)=>{
        return arr.concat(el)
    },[]);

    if (arrIg.length === 0){
        arrIg = <p>Please add ingredients</p>
    }

    return(
        <div className ={styles.Burger}>
            <BurgerIngredient type = "bread-top"/>
            {arrIg}
            <BurgerIngredient type = "bread-buttom"/>
        </div>
    );
}

export default burger;