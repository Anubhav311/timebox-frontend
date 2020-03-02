import React, { useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import { TaskContext } from './context/TasksContext';


function InputField(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const inputRef = useRef(null);
    const updateTasksState = [...tasks]

    const changeHandler = (e) => {
        e.preventDefault()
        updateTasksState[props.taskIndex].task = e.target.value
        console.log(e.target.name)
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
        let payload = {
            id: tasks[props.taskIndex].task_id_pk, 
            payload: {
                'task': tasks[props.taskIndex].task
            }
        }

        return () => {
            axios.put(`http://localhost:4000/api/tasks`, payload)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }, [])

    return (
        <form onSubmit={props.changeEditMode}>
            <input 
                onChange={changeHandler}
                onBlur={props.changeEditMode}
                type="text"
                ref={inputRef}
                defaultValue={props.text}
                name={'abcd'}
            />
        </form>
    )
}

export default InputField;