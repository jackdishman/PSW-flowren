import { combineReducers } from 'redux';
import UserReducer from './reducer_users';
import ActiveUserReducer from './reducer_active_user';
import ActiveIdentityReducer from './ActiveIdentityReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    activeUser: ActiveUserReducer,
    identity: ActiveIdentityReducer,
})

export default rootReducer