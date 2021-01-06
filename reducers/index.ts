import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import StallReducer from './StallReducer';

export default combineReducers({
    SignInReducer,
    StallReducer,
})