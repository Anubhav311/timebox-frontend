import React, { useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import { TaskContext } from '../context/TasksContext';


function TaskInputField(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const inputRef = useRef(null);
    const updateTasksState = [...tasks]

    const changeHandler = (e) => {
        e.preventDefault()

        updateTasksState[props.taskIndex].task = e.target.value

        dispatch({
            type: 'UPDATE_TASK_STATE',
            payload: updateTasksState
        });
    }

    const sendPutRequest = () => {
        let payload = {
            id: tasks[props.taskIndex].task_id_pk, 
            payload: {
                'task': tasks[props.taskIndex].task
            }
        }

        axios.put('https://timebox-be.herokuapp.com/api/tasks', payload)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.message)
            })

        props.changeEditMode()
    }

    useEffect(() => {
        if (props.isInEditMode) {
            inputRef.current.focus()
        }
    }, [props.isInEditMode])

    return (
        <form onSubmit={sendPutRequest}>
            <input 
                onChange={changeHandler}
                onBlur={sendPutRequest}
                type="text"
                ref={inputRef}
                defaultValue={props.text}
            />
        </form>
    )
}

export default TaskInputField;