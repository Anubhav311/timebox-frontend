import React, { useEffect, useRef, useContext } from 'react';

import { TaskContext } from '../context/TasksContext';
import axios from 'axios';


function NewTaskInputField(props) {
    const inputRef = useRef(null);
    const {tasks, dispatch} = useContext(TaskContext)
    const updatedTasksState = [...tasks]
    const newSubtaskask = {
        subtask: '',
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
                if (updatedTasksState[props.taskIndex].subtasks) {
                    updatedTasksState[props.taskIndex].subtasks.push(res.data)
                } else {
                    updatedTasksState[props.taskIndex].subtasks = [res.data]
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
                onBlur={sendPostRequest} 
                ref={inputRef} 
                onChange={changeHandler}
            />
        </form>
    )
}

export default NewTaskInputField;