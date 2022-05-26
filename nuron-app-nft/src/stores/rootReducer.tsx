import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user.store';
import authReducer from './auth.store';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer
});

export default rootReducer;
