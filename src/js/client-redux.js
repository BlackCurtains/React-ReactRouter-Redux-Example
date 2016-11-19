import {combineReducers, applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
//import promise from "redux-promise-middlware";

/******************BASIC********************************
const reducer = function(state, action){
    if(action.type == "INC"){
        //return state + 1;
        return state + action.payload;
    }
    return state;
}
const store = createStore(reducer, 12);
store.subscribe( ()=> {
    console.log("Store Changed!!", store.getState() );
});
store.dispatch({type: "INC", payload: 12});
***********************************************************
*/

/* Middlewares ********************************************
const reducer = function(state = 0, action){
    if(action.type == "INC"){
        return state + 1;
    } else if(action.type == "DEC"){
        return state - 1;
    } else if(action.type == "C") {
        throw new Error("AAA!!!");
    }
    return state;
}
const logger = (store) => (next) => (action) => {
    console.log("Action Fired:", action);
    next(action);
}
const error = (store) => (next) => (action) => {
    try{
        next(action);
    } catch(e){
        console.log("Error: ", e);
    }
    
}
const middleware = applyMiddleware(logger);
const store = createStore(reducer, 1, middleware);
store.subscribe( ()=> {
    console.log("Store Changed!!", store.getState() );
});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "DEC", payload: 1});
store.dispatch({type: "C", payload: 1});

********************************************************
*/

/* INTERMEDIATE ********************************************
const userReducer = (state = {}, action) => {
    // reducer must return something.. usually state
    // const newState = { ...state };
    switch(action.type){
        case "CHANGE_USER": {
            //state.name = action.payload;
            state = {...state, name: action.payload};
            break;
        }
        case "CHANGE_AGE": {
            //state.age = action.payload;
            state = {...state, age: action.payload};
            break;
        }
    }
    return state;

};
 const tweetsReducer = (state = [] , action) => {
     return state;

 };

 const reducers = combineReducers({
     // object: which piece of object we are modifying
     user: userReducer,
     tweets: tweetsReducer
 });

const store = createStore(reducers);

store.subscribe( ()=> {
    console.log("Store Changed: ", store.getState() );
});

// calling the action to happen...
// store.dispatch mush have type on it..

store.dispatch({type: "CHANGE_USER", payload: "Will"})
store.dispatch({type: "CHANGE_AGE", payload: 20})
*/

/*
const store = createStore(reducers , {
    user: { // this will be state for userReducer only as defined in combineReducers
        name: "Madhav Poudel",
        age: 35
    },
    tweets: []
})

Leave this aproach because its better to define default values in reducer parameters
*/

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
}
const reducer = function(state = initialState, action){
    switch(action.type){
        case "FETCH_USERS": {
            return {...state, fetching: true };
            break;
        }
        case "FETCH_USER_ERR": {
            return {...state, fetching: false, error: action.payload };
            break;
        }
        case "RECEIVE_USERS": {
            return {...state, fetching: false, fetched: true, users: action.payload };
            break;
        }
    }
    return state;
}

const middleware = applyMiddleware(thunk, logger());

// with redux-promise
const store = createStore(reducer, 1, middleware);

store.dispatch((dispatch) => {
    dispatch({type: "FETCH_USERS"})
    axios.get("http://rest.learncode.academy/api/western/users")
        .then( (response) => {
            dispatch({type: "RECEIVE_USERS", payload: response.data});
        })
        .catch(err => {
            dispatch({type:"FETCH_USER_ERR", payload: err});
        })
    // do something
    //dispatch({type: "BAR"});
});


/***WITh Promises

const middleware = applyMiddleware(promise(), thunk, logger());

store.dispatch({
    type: "FETCH_USERS", 
    payload: axios.get("http://rest.learncode.academy/api/western/users")
});
*/
