import React, { useEffect, useRef, useState, useContext } from 'react';

import { TaskContext } from './context/TasksContext';


function InputField(props) {
    const [inputDefaultValue, setInputDefaultValue] = useState(props.text);
    const {tasks, dispatch} = useContext(TaskContext)
    const inputRef = useRef(null);
    const updateTasksState = [...tasks]
    
    const changeHandler = (e) => {
        setInputDefaultValue(e.target.value);
        updateTasksState[props.taskIndex].task = inputDefaultValue
        dispatch({
            type: 'UPDATE_TASK_STATE',
            payload: updateTasksState
        });
        console.log(updateTasksState[props.taskIndex], tasks[props.taskIndex])
    }

    useEffect(() => {
        if (props.isInEditMode) {
            inputRef.current.focus()
        }
    }, [props.isInEditMode])


    return (
        <input 
            onChange={changeHandler}
            onBlur={props.changeEditMode}
            type="text"
            ref={inputRef}
            defaultValue={inputDefaultValue}
        />
    )
}

export default InputField;