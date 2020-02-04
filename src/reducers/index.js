import { combineReducers } from 'redux'

import { TasksReducer } from './reducers';

const rootReducer = combineReducers({
    tasks: TasksReducer
})

export default rootReducer;