import React, { useEffect, useRef, useContext } from 'react';

import { TaskContext } from './context/TasksContext';
import axios from 'axios';


function NewTaskInputField(props) {
    console.log(props.columnDate)
    const inputRef = useRef(null);
    const {tasks, dispatch} = useContext(TaskContext)
    const newTask = {
        task: '',
        task_due_at: props.columnDate,
        user_id_fk: 1
    }

    const changeHandler = e => {
        e.preventDefault()
        newTask.task = e.target.value
        console.log(newTask)
    }

    useEffect(() => {
        if (props.addTask) {
            inputRef.current.focus()
        }
    }, [props.addTask])

    useEffect(() => {
        return () => {
            if (newTask.task !== '') {
                axios.post(`http://localhost:4000/api/tasks`, {...newTask})
                .then(res => {
                    console.log(res)
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