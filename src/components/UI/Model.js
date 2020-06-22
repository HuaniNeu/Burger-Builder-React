import React, { Component } from 'react';
import styles from './Model.module.css'
import BackDrop from './Backdrop';
import Aux from '../../hoc/Aux'

class Model extends Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.childre !== this.props.children
    }

render (){
    return(
            <Aux>
                <BackDrop show = {this.props.show}
                        clicked = {this.props.modelClosed}></BackDrop>

                <div className ={styles.Modal}
                    style={{
                        transform: this.props.show ? 'traslateY(0)' : 'traslateY(-100vh)',
                        opacity: this.props.show ? ' 1':'0'
                        }}>
                    {this.props.children}
                </div>
            </Aux>
    )
}
}




export default Model;   