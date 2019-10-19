import React, { Component } from 'react';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}/>
                <CounterControl label="Add 5" clicked={this.props.onAddition}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstraction}  />
                <hr />
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult=>(
                        <li key={strResult.id} 
                        onClick={()=>this.props.onDeleteResult(strResult.id)}>
                        {strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

//()=>this.props.onDeleteResult(strResult.id) -- This is an anonymous function syntax

const mapStateToProps = (state) => {
    return {
        ctr: state.counterReducer.counter,
        storedResults: state.resultReducer.results
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        onIncrementCounter: () => {
            dispatch({type: actionTypes.INCREMENT})
        },

        onDecrementCounter: () => {
            dispatch({type:actionTypes.DECREMENT})
        },

        onAddition: () => {
            dispatch({type:actionTypes.ADD,value:5})
        },

        onSubstraction: () => {
            dispatch({type:actionTypes.SUB,value:5})
        },

        onStoreResult: (result) => {
            dispatch({type:actionTypes.STORE_RESULT,result:result})
        },

        onDeleteResult: (id) => {
            dispatch({type:actionTypes.DELETE_RESULT,itmID:id})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);