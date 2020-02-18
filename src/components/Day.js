import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Task from './Task';
import { TaskContext } from './context/TasksContext';

const Div_day = styled.div`
    background: red;
    width: 20%;
    height: auto;
    margin: 10px;
    padding: 10px;

    .day-header {
        height: 50px;
    }

    .day-body {

    }

    .add-task {
        width: 100%;
        height: 20px;
    }
`

function Day(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const [addTask, setAddTask] = useState(false)
    const inputRef = useRef(null);
    let tasksList = []

    function AddTask() {
        setAddTask(!addTask)
    }

    for (let index = 0; index < props.tasks.length; index++) {
        if (props.tasks[index].task_due_at.split('T')[0] == `${props.columnDate.getFullYear()}-${('0' + (props.columnDate.getMonth() + 1)).slice(-2)}-${('0' + props.columnDate.getDate()).slice(-2)}`) {
            tasksList.push(<Task id={index} task={props.tasks[index].task} taskId={props.tasks[index].task_id_pk} />) 
        }
    }

    useEffect(() => {
        if (addTask) {
            inputRef.current.focus()
        }
    }, [addTask])

    tasksList.push(addTask ? <form onSubmit={AddTask}><input onBlur={AddTask} ref={inputRef}></input></form> : <button className="add-task" onClick={AddTask}>+</button>)

    return (
        <Div_day className="day">
            <div className="day-header">
                <p>{props.day}</p>
            </div>
            <div className="day-body">
                {tasksList}
            </div>
        </Div_day>
    )
}

export default Day;