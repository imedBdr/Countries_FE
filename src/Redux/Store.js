import { createStore } from "redux";
import { HandleDarkReducer } from "./darkMode";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet
  }
  
const persistedReducer = persistReducer(persistConfig, HandleDarkReducer)
let store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
let persistor = persistStore(store)
export  {store,persistor};













/*


import {createStore} from "redux";
import {handleUserReducer} from "./user.js";



const store = createStore(handleUserReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;




*/