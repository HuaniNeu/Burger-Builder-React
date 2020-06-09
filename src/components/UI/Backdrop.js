import React from 'react';
import styles from './Backdrop.module.css';

const backDrop =(props) =>(
    props.show? <div className={styles.BackDrop}
                    onClick = {props.clicked}></div> : null
)

export default backDrop;