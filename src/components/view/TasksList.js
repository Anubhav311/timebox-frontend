import React, { useState } from 'react';
import styled from 'styled-components';

import Task from './Task';
import NewTaskInputField from './NewTaskInputField';

const DivDay = styled.div`
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

function TasksList(props) {
    const [addTask, setAddTask] = useState(false)
    let tasksListArray = []

    function AddTaskToggle() {
        setAddTask(!addTask)
    }

    for (let index = 0; index < props.tasks.length; index++) {
        if (props.tasks[index].task_due_at.split('T')[0] === `${props.columnDate.getFullYear()}-${('0' + (props.columnDate.getMonth() + 1)).slice(-2)}-${('0' + props.columnDate.getDate()).slice(-2)}`) {
            tasksListArray.push(
                <Task 
                    task={props.tasks[index].task} 
                    taskIndex={index} 
                    taskIdPk={props.tasks[index].task_id_pk} 
                />
            ) 
        }
    }


    tasksListArray.push(
        addTask 
            ? 
        <NewTaskInputField 
            columnDate={props.columnDate} 
            addTask={addTask} 
            AddTaskToggle={AddTaskToggle} 
        /> 
            : 
        <button className="add-task" onClick={AddTaskToggle}> + </button>
    )

    return (
        <DivDay className="day">
            <div className="day-header">
                <p>{props.day}</p>
            </div>
            <div className="day-body">
                {tasksListArray}
            </div>
        </DivDay>
    )
}

export default TasksList;