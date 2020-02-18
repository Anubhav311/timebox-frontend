import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import Subtask from './Subtask';
import Title from './Title';
import Axios from 'axios';
import { TaskContext } from './context/TasksContext';

const Div_task = styled.div`
    .task-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: yellow;
        margin-right: 10px;
    }

    .subtasks {
        display: block;
    }

    .hide {
        display: none;
    }
`

function Task(props) {
    const [subtaskActive, setSubtaskActive] = useState('hide')
    const {tasks, dispatch} = useContext(TaskContext)
    const updatedTasksState = [...tasks]

    function toggleSubtask() {
        setSubtaskActive(subtaskActive === 'hide' ? 'subtasks' : 'hide')
    }

    function deleteTask() {
        console.log(props.id, props.taskId)
        updatedTasksState.splice(props.id, 1)
        Axios.delete(`http://localhost:4000/api/tasks?task_id_pk=${props.taskId}`)
            .then(res => {
                if (props.taskId === res.data[0]) {
                    console.log(res)
                    dispatch({
                        type: 'DELETE_TASK',
                        payload: updatedTasksState
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Div_task>
            <div className="task-heading">
                <div className="dot" onClick={toggleSubtask}></div>
                <Title taskId={props.id} text={props.task} />
                <div style={{marginLeft: '10px', cursor: 'pointer'}} onClick={deleteTask}>x</div>
            </div>
            {subtaskActive === 'hide' ? '' : <Subtask subtaskActive={subtaskActive} taskId={props.taskId}/>}
        </Div_task>
    )
}

export default Task;