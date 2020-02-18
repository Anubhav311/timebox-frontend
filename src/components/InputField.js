import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';

import { TaskContext } from './context/TasksContext';


function InputField(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const inputRef = useRef(null);
    const updateTasksState = [...tasks]

    const changeHandler = (e) => {
        updateTasksState[props.taskIndex].task = e.target.value
        dispatch({
            type: 'UPDATE_TASK_STATE',
            payload: updateTasksState
        });
    }

    useEffect(() => {
        if (props.isInEditMode) {
            inputRef.current.focus()
        }
    }, [props.isInEditMode])

    useEffect(() => {
        return () => {
            axios.put(`https://timebox-be.herokuapp.com/api/tasks`, {task_id_pk: tasks[props.taskIndex].task_id_pk, payload: {task: tasks[props.taskIndex].task}})
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }, [])

    return (
        <input 
            onChange={changeHandler}
            onBlur={props.changeEditMode}
            type="text"
            ref={inputRef}
            defaultValue={props.text}
        />
    )
}

export default InputField;