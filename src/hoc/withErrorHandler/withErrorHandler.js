import React, {Component} from 'react';
import Aux from '../Aux';
import Model from '../../components/UI/Model';
import axios from 'axios'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }
        componentWillMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error: null})
                return req;
            })
            axios.interceptors.response.use(resp=>resp, error=>{
                this.setState({error: error})
            })
        }
        errorHandler = () =>{
            this.setState({error:null})
        }
        render(){
            return (
                <Aux>
                    <Model show= {this.state.error}
                           modelClosed = {this.errorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.props }/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
