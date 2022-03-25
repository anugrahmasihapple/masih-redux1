// this is ES6 method of import
const redux = require('redux')
// this is how to import logger this is middleware
const reduxLogger = require('redux-logger')

// creating store in redux now
const createStore = redux.createStore

// this is how to combine multple functions into one so we import this
const combineReducer = redux.combineReducers

const applyMiddleware = require("redux").applyMiddleware
//const applyMiddlaware = redux.applyMiddleware
// this is how to create logger
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'

const BUY_ICECREAM = 'BUY_ICECREAM'

//this fun is for buy cake
function buyCake()
{
    return{
        type: BUY_CAKE,
        info: 'first redux action'
    }
}

// this is to buy icecrems
function buyIceCream(){
    return {
        type: BUY_ICECREAM
    }
}

// (previousState, action) => newState
// this is stock when shop is opened

// this is for cakes state
const initialCakeState = {
    numOfcakes: 10
}

// this is fore icecreams
const initialIceCreamState = {
    numOfIceCreams: 20
}


// it's a reducer function which returns cuurent state of available cakes

// spliting reducer into 2 parts
const cakeReducer = ( state = initialCakeState, action) => {
    switch (action.type){
        case BUY_CAKE: return {
            //this is to make a  copy of current state and then change what needed
            // this is called state operator 
            ...state,
            numOfcakes: state.numOfcakes -1
        }
        default: return state
    }

}

// this reducer fun is to reduce numof icecream
const iceCreamReducer = ( state = initialIceCreamState, action) => {
    switch (action.type){
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams -1
        }
        default: return state
    }

}

// this is to tell redux how many functions we  have
const rootReducer = combineReducer({
    // now combine the functions created 2 reduce func here
    cake: cakeReducer,
    iceCream: iceCreamReducer

})
const store = createStore(rootReducer, applyMiddleware(logger))

console.log('initial state', store.getState())

const unsubscribe = store.subscribe(()  => {} )

//dispatch methodd
store.dispatch(buyCake ()) 
store.dispatch(buyCake ()) 
store.dispatch(buyCake ()) 

// this is to buy icecreams
store.dispatch(buyIceCream ()) 
store.dispatch(buyIceCream ()) 

// call unsubscribe method now
unsubscribe ()
