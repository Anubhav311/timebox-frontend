import { combineReducers } from 'redux'

import { TasksReducer, SubtasksReducer } from './reducers';

const rootReducer = combineReducers({
    tasks: TasksReducer,
    subtasks: SubtasksReducer
})

export default rootReducer;