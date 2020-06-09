import React from 'react';
import styles from './Model.module.css'
import BackDrop from './Backdrop';
import Aux from '../../hoc/Aux'

const model =(props) =>(
<Aux>
    <BackDrop show = {props.show}
              clicked = {props.modelClosed}></BackDrop>

    <div className ={styles.Modal}
        style={{
            //transform:props.show ? 'traslateY(0)' : 'traslateY(-100vh)',
            opacity: props.show ? ' 1':'0'
            }}>
        {props.children}
    </div>
</Aux>
)

export default model;   