/**
 * Redux store
 * Author : Murugappan V
 * Date   : 16 Oct 2018
 */
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './Reducer';

let middlewares = [thunk];
if (__DEV__) {
    middlewares.push(createLogger({}));
}

function configureStore(initialState) {
    return createStore(
        reducer, 
        initialState, 
        applyMiddleware(...middlewares)
    );
}
  
export const store = configureStore({});