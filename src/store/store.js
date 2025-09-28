// import { combineReducers, compose, createStore } from "redux"
import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { carReducer } from "./reducers/car.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"
import { toyReducer } from "./reducers/toy.reducer.js"

// const { createStore, compose, combineReducers } = Redux

const rootReducer = combineReducers({
    carModule: carReducer,
    userModule: userReducer,
    ToyModule: toyReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
