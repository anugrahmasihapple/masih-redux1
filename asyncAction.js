const redux = require('redux')
const createStore = redux.createStore
//const applyMiddlaware = redux.applyMiddleware
const applyMiddleware = require("redux").applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE =  'FETCH_USERS_FAILURE'

// this fun will fetch users data
const fetchUsersRequest =() =>{
    return{
        type: FETCH_USERS_REQUEST 
    }
}

// THIS arraow function is for users sucess

const fetchUsersSuccess = users =>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

// this is to handle request failure
const fetchUsersFailure = error =>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState , action ) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                //copy the existing state
                ...state, 
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading: false,
                users: action.payload,
                //clear error if any
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return{
                loading: false,
                users: [],
                error: action.payload
            }
    }

}


const fetchUsers = () =>{
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        //if success
        .then(response =>{
           // here response.data is array of users
           const users = response.data.map(user => user.id)
           dispatch(fetchUsersSuccess(users))
        })
        .catch(error =>{
            //error.msg is the error discription
            dispatch(fetchUsersFailure( error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => {console.log(store.getState())})

store.dispatch(fetchUsers())

