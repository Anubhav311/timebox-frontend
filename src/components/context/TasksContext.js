import React, { createContext, useReducer } from 'react';
import { TasksReducer } from '../../reducers/reducers';

export const TaskContext = createContext();

const TaskContextProvider = (props) => {

    const [tasks, dispatch] = useReducer(TasksReducer, [])

    return (
        <TaskContext.Provider value={{tasks, dispatch}}>
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskContextProvider;
