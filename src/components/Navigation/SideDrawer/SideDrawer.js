import React from 'react';
import NavItems from '../NavItems/NavItems';
import styles from './SideDrawer.module.css'; 
import Logo from '../../Logo/Logo';
import BackDrop from '../../UI/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) =>{
    let sideDrawerMovement = [styles.SideDrawer, styles.Close]
    if (props.open){
        sideDrawerMovement = [styles.SideDrawer, styles.Open]
    }
    return(
     <Aux>
         <BackDrop show={props.open} 
                   clicked ={props.closed}></BackDrop>
        <div className={sideDrawerMovement.join(' ')}>
            <Logo height ="8%"/>
            <nav>
                <NavItems>

                </NavItems>
            </nav>
        </div>
    </Aux>
    ); 
};

export default sideDrawer;