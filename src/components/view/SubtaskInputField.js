import React, { useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import { TaskContext } from '../context/TasksContext';


function TaskInputField(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const inputRef = useRef(null);
    const updateTasksState = [...tasks]

    const changeHandler = (e) => {
        e.preventDefault()
        updateTasksState[props.taskIndex].subtasks[props.subtaskIndex].subtask = e.target.value
        dispatch({
            type: 'UPDATE_SUBTASK_STATE',
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
            id: tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask_id_pk,
            payload: {
                'subtask': tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask
            }
        }
        console.log(tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask_id_pk, tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask)

        return () => {
            axios.put('http://localhost:4000/api/subtasks', payload)
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
            />
        </form>
    )
}

export default TaskInputField;