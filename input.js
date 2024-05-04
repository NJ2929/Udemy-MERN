import React, {useReducer, useEffect} from 'react';
import {validate} from '../../util/validators';

import './Input.css';

const inputReducer =(state,action)=> {
    switch (action.type){
        case 'CHANGE':
            return {
                //first creating a copy of the old state, so that we dont use 
                //any data,useReducer are used where we want to 
                //manage complex states 
                // spread operator, helps to copy the contents of the state.all its 
                //key and value pairs 
                ...state, // this will have the initial state which we have assigned, i/e blank and isValid set to False
                value: action.val,
                isValid: validate(action.val,action.validators) 
            };
            case 'TOUCH':{
                return {
                    ...state,
                    isTouched: true
                }
            }
            default: 
            return state; 

}}
const Input = (props)=> {

    console.log(props.value);
    console.log(props.valid);
    // inputstate is the current state
    // dispatch is the function for the useReducer, like we use for UseState
const [inputState, dispatch]=useReducer(inputReducer,{
    value: props.initialValue || ''
    ,isTouched:false
    ,isValid:props.initialValid || false
   
    }); 
    // the value of input, will decide if, textarea should be printed 
    // or input 

    //dependencies are : props and inputState.
    // it means, useEffect wil run if anything in the props or the inputstate, changes.
    //i.e the dependencies changes. 

   const {id,onInput} =props;
   const {value ,isValid}=inputState;


    useEffect(()=> {
        props.onInput(id,value,isValid)

    },[id, value, isValid,onInput]);



    const changeHandler=event=>
    {
        dispatch({type:'CHANGE', 
        val: event.target.value,
        validators: props.validators
        }); //dispatch to reducer.
    }

    const touchHandler=()=>{
        dispatch({
            type:'TOUCH'
        });
       
    }

   const element= 
   props.element==='input'?  
   (
   <input 
    id={props.id} 
    type={props.type}
    placeholder={props.placeholder} 
    onChange={changeHandler} 
    value={inputState.val}
    onBlur={touchHandler}
    />)
    :
    (
<textarea 
    id={props.id} 
    rows={props.rows || 3} 
    onChange={changeHandler}
    value={inputState.val}
    onBlur={touchHandler}
    />
    );


return <div className={`form-control  ${!inputState.isValid &&inputState.isTouched && 'form-control--invalid'} `}>
    <label htmlFor={props.id}> {props.label} </label>
    {element}
    {!inputState.isValid && inputState.isTouched && <p> {props.errorText} </p>}
</div>
};

export default Input;
