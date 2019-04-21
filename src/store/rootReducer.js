import { combineReducers } from 'redux';

import { reducer as exampleReducer } from '../modules/example';

const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;
