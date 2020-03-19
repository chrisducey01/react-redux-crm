import { combineReducers } from 'redux';

import user from './user';
import customer from './customer';

const rootReducer = combineReducers({user, customer});

export default rootReducer;