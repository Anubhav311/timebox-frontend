import React, { useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import { TaskContext } from '../context/TasksContext';
import './SubtaskInputFieldStyles.css';

function TaskInputField(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const inputRef = useRef(null);
    const updateTasksState = [...tasks]

    const changeHandler = (e) => {
        e.preventDefault()
        updateTasksState[props.columnIndex].tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask = e.target.value
        dispatch({
            type: 'UPDATE_SUBTASK_STATE',
            payload: updateTasksState
        });
    }

    const sendPutRequest = () => {
        console.log(tasks[props.columnIndex], props)
        let payload = {
            id: tasks[props.columnIndex].tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask_id_pk,
            payload: {
                'subtask': tasks[props.columnIndex].tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask
            }
        }

        axios.put('https://timebox-be.herokuapp.com/api/subtasks', payload)
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
                className="subtask_input_field"
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