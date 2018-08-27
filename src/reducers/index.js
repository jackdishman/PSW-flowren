import { combineReducers } from 'redux';
import UserReducer from './reducer_users';
import ActiveUserReducer from './reducer_active_user';

const rootReducer = combineReducers({
    user: UserReducer,
    activeUser: ActiveUserReducer,
})

export default rootReducer