import React, { useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import '../../styles/TaskInputField.css';
import { TaskContext } from '../context/TasksContext';

function TaskInputField(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const inputRef = useRef(null);
    const updateTasksState = [...tasks]

    const changeHandler = (e) => {
        e.preventDefault()

        updateTasksState[props.columnIndex].tasks[props.taskIndex].task = e.target.value

        dispatch({
            type: 'UPDATE_TASK_STATE',
            payload: updateTasksState
        });
    }

    const sendPutRequest = () => {

        let payload = {
            id: props.taskIdPk, 
            payload: {
                'task': tasks[props.columnIndex].tasks[props.taskIndex].task
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
                className="task_input_field"
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