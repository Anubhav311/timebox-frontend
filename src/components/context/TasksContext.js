import React, { Component, createContext } from 'react';

export const TaskContext = createContext();

class TaskContextProvider extends Component {
    state = { 
        tasks: [],
        subtasks: []
    }
    render() { 
        return ( 
            <TaskContext.Provider value={{...this.state}}>
                {this.props.children}
            </TaskContext.Provider>
        );
    }
}

export default TaskContextProvider;