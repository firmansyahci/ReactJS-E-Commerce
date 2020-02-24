import { combineReducers } from 'redux'
import productReducer from './product'
import cartReducer from './cart';

const reducers = combineReducers({
    product: productReducer,
    cart: cartReducer
});

export default reducers;