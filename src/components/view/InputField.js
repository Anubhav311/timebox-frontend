import React, { useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import { TaskContext } from '../context/TasksContext';


function InputField(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const inputRef = useRef(null);
    const updateTasksState = [...tasks]

    const changeHandler = (e) => {
        e.preventDefault()
        if (props.name === 'task') {
            updateTasksState[props.taskIndex].task = e.target.value
            dispatch({
                type: 'UPDATE_TASK_STATE',
                payload: updateTasksState
            });
        } else if (props.name === 'subtask') {

        }

    }

    useEffect(() => {
        if (props.isInEditMode) {
            inputRef.current.focus()
        }
    }, [props.isInEditMode])

    useEffect(() => {
        let payload;
        let url;

        if (props.name === 'task') {
            payload = {
                id: tasks[props.taskIndex].task_id_pk, 
                payload: {
                    'task': tasks[props.taskIndex].task
                }
            }
            url = 'https://timebox-be.herokuapp.com/api/tasks'
        } else if (props.name === 'subtask') {
            // payload = {
            //     id: tasks[props.taskIndex].task_id_pk, 
            //     payload: {
            //         'task': tasks[props.taskIndex].task
            //     }
            // }
            console.log(tasks[props.taskIndex].subtasks, props.taskIndex)
            url = 'https://timebox-be.herokuapp.com/api/tasks'
        }

        return () => {
            axios.put(url, payload)
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
                name={props.name}
            />
        </form>
    )
}

export default InputField;