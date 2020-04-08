import React, { useEffect, useRef, useContext, useState } from 'react';

import { TaskContext } from '../context/TasksContext';
import axios from 'axios';


function NewTaskInputField(props) {
    const inputRef = useRef(null);
    const [addTask, setAddTask] = useState(false)
    const {tasks, dispatch} = useContext(TaskContext)
    const updatedTasksState = [...tasks]
    
    // assigning local time to new task in ISO string format
    const timezoneOffset = tasks[props.columnIndex].columnDate.getTimezoneOffset() * 60000 //offset in milliseconds
    const localISOTime = new Date(Date.now() - timezoneOffset)
    const localISOTimeString = localISOTime.toISOString().slice(0, -1)
    const newTask = {
        task: '',
        task_due_at: localISOTimeString,
        user_id_fk: 1
    }

    const changeHandler = e => {
        e.preventDefault()
        newTask.task = e.target.value
    }

    function AddTaskToggle() {
        setAddTask(!addTask)
    }

    useEffect(() => {
        if (addTask) {
            inputRef.current.focus()
        }
    }, [addTask])

    const sendPostRequest = () => {
        if (newTask.task !== '') {
            axios.post(`https://timebox-be.herokuapp.com/api/tasks`, {...newTask})
            .then(res => {
                updatedTasksState[props.columnIndex].tasks.push(res.data)
                dispatch({
                    type: 'ADD_TASK_STATE',
                    payload: updatedTasksState
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        AddTaskToggle()
    }


    return (
        <div>
        {addTask
            ?
        <form onSubmit={sendPostRequest}>
            <input 
                onBlur={sendPostRequest} 
                ref={inputRef} 
                onChange={changeHandler}
            />
        </form>
            :
        <button className="add-task" onClick={AddTaskToggle}> + </button>}
    </div>
    )
}

export default NewTaskInputField;