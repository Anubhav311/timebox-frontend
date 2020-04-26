import React, { useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import '../../styles/NewSubtaskInputField.css';
import { TaskContext } from '../context/TasksContext';
import { GetLocalISOTimeString } from '../utilities/DaysOfWeek';


function NewTaskInputField(props) {
    const inputRef = useRef(null);
    const {tasks, dispatch} = useContext(TaskContext)
    const updatedTasksState = [...tasks]
    const newSubtaskask = {
        subtask: '',
        subtask_due_at: GetLocalISOTimeString(tasks[props.columnIndex].columnDate),
        task_id_fk: props.taskIdPk
    }

    const changeHandler = e => {
        e.preventDefault()
        newSubtaskask.subtask = e.target.value
    }

    useEffect(() => {
        if (props.addSubtask) {
            inputRef.current.focus()
        }
    }, [props.addSubtask])

    function sendPostRequest() {
        if (newSubtaskask.subtask !== '') {
            axios.post(`https://timebox-be.herokuapp.com/api/subtasks`, {...newSubtaskask})
            .then(res => {
                if (updatedTasksState[props.columnIndex].tasks[props.taskIndex].subtasks) {
                    updatedTasksState[props.columnIndex].tasks[props.taskIndex].subtasks.push(res.data)
                } else {
                    updatedTasksState[props.columnIndex].tasks[props.taskIndex].subtasks = [res.data]
                }
                dispatch({
                    type: 'ADD_SUBTASK_STATE',
                    payload: updatedTasksState
                })
            })
            .catch(err => {
                console.log(err)
            })
        }

        props.AddSubtaskToggle()
    }

    return (
        <form onSubmit={sendPostRequest}>
            <input 
                className="add-subtask-input-field"
                onBlur={sendPostRequest} 
                ref={inputRef} 
                onChange={changeHandler}
            />
        </form>
    )
}

export default NewTaskInputField;