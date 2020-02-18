import React, { useEffect, useRef, useContext } from 'react';

import { TaskContext } from './context/TasksContext';
import axios from 'axios';


function NewTaskInputField(props) {
    const inputRef = useRef(null);
    const {tasks, dispatch} = useContext(TaskContext)
    const updatedTasksState = [...tasks]
    const newTask = {
        task: '',
        task_due_at: props.columnDate,
        user_id_fk: 1
    }

    const changeHandler = e => {
        e.preventDefault()
        newTask.task = e.target.value
    }

    useEffect(() => {
        if (props.addTask) {
            inputRef.current.focus()
        }
    }, [props.addTask])

    useEffect(() => {
        return () => {
            if (newTask.task !== '') {
                axios.post(`https://timebox-be.herokuapp.com/api/tasks`, {...newTask})
                .then(res => {
                    updatedTasksState.push(res.data)
                    dispatch({
                        type: 'UPDATE_TASK_STATE',
                        payload: updatedTasksState
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }, [])

    return (
        <form onSubmit={props.AddTaskToggle}>
            <input onBlur={props.AddTaskToggle} ref={inputRef} onChange={changeHandler}/>
        </form>
    )
}

export default NewTaskInputField;