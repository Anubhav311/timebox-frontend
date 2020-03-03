import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import SubtasksList from './SubtasksList';
import Axios from 'axios';
import { TaskContext } from './context/TasksContext';
import InputField from './InputField';

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
    const [isInEditMode, setIsInEditMode] = useState(false)
    const [subtaskActive, setSubtaskActive] = useState('hide')
    const {tasks, dispatch} = useContext(TaskContext)
    const updatedTasksState = [...tasks]

    const changeEditMode = () => {
        setIsInEditMode(!isInEditMode)
    }

    function toggleSubtask() {
        setSubtaskActive(subtaskActive === 'hide' ? 'subtasks' : 'hide')
    }

    function deleteTask() {
        updatedTasksState.splice(props.id, 1)
        Axios.delete(`https://timebox-be.herokuapp.com/api/tasks?task_id_pk=${props.taskIdPk}`)
            .then(res => {
                console.log(props.taskIdPk, res.data[0])
                if (props.taskIdPk === res.data[0]) {
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
                <div>
                    {isInEditMode 
                        ? 
                    <InputField 
                        name={props.name} 
                        taskIndex={props.taskIndex} 
                        changeEditMode={changeEditMode} 
                        isInEditMode={isInEditMode} 
                        text={props.task}
                    />
                        :
                    <p onClick={changeEditMode}>{props.task}</p>}
                </div>
                <div 
                    style={{
                        marginLeft: '10px', 
                        cursor: 'pointer'
                    }} 
                    onClick={deleteTask}
                >x</div>
            </div>
            {
                subtaskActive === 'hide' 
                    ? 
                '' 
                    : 
                <SubtasksList 
                    subtaskActive={subtaskActive} 
                    taskIdPk={props.taskIdPk} 
                    taskIndex={props.id} 
                />
            }
        </Div_task>
    )
}

export default Task;