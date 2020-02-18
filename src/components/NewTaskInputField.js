import React, { useEffect, useRef, useContext } from 'react';

import { TaskContext } from './context/TasksContext';


function NewTaskInputField(props) {
    const inputRef = useRef(null);
    const {tasks, dispatch} = useContext(TaskContext)

    useEffect(() => {
        if (props.addTask) {
            inputRef.current.focus()
        }
    }, [props.addTask])

    return (
        <form onSubmit={props.AddTaskToggle}>
            <input onBlur={props.AddTaskToggle} ref={inputRef} />
        </form>
    )
}

export default NewTaskInputField;