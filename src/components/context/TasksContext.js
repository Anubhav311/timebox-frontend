import React, { useState, createContext, useReducer } from 'react';
import { TasksReducer } from '../../reducers/reducers';

export const TaskContext = createContext();

// const tasksReducer = (state, action) => {
//     switch(action.type) {
//         case 'GET_TASKS_REQUEST':
//             return {
//                 ...state,
//                 tasks: action.payload
//             }
//         case 'GET_TASKS_SUCCESS':
//             return {
//                 ...state,
//                 tasks: action.payload
//             }
//         case 'GET_TASKS_FAILURE':
//             return {
//                 ...state,
//                 tasks: action.payload
//             }
//         default:
//             return state;
//     }
// }

const TaskContextProvider = (props) => {
    const [tasks, dispatch] = useReducer(TasksReducer, {
        tasks: [],
        subtasks: []
    })
    return (
        <TaskContext.Provider value={{tasks, dispatch}}>
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskContextProvider;
