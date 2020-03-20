import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import SubtasksList from './SubtasksList';
import { TaskContext } from '../context/TasksContext';
import TaskInputField from './TaskInputField';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import TimePicker from './TimePicker';

const DivTask = styled.div`
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
    const {isShowing, toggle} = useModal();
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
        updatedTasksState[props.columnIndex].tasks.splice(props.taskIndex, 1)

        Axios.delete(`https://timebox-be.herokuapp.com/api/tasks?task_id_pk=${props.taskIdPk}`)
            .then(res => {
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
        <DivTask>
            {/* code for rendering task */}
            <div className="task-heading">
                <div className="dot" onClick={toggleSubtask}></div>
                <div>
                    {isInEditMode 
                        ? 
                    <TaskInputField 
                        taskIndex={props.taskIndex}
                        columnIndex={props.columnIndex}
                        changeEditMode={changeEditMode}
                        isInEditMode={isInEditMode} 
                        text={props.task}
                        taskIdPk={props.taskIdPk}
                    />
                        :
                    <p onClick={changeEditMode}>{props.task}</p>}
                </div>
                <div className="App">
                    <button className="button-default" onClick={toggle}>M</button>
                    <Modal isShowing={isShowing} hide={toggle}>
                        <TimePicker
                            taskIndex={props.taskIndex}
                            columnIndex={props.columnIndex}
                            taskIdPk={props.taskIdPk}
                        />
                    </Modal>
                </div>

                <div 
                    style={{
                        marginLeft: '10px', 
                        cursor: 'pointer'
                    }} 
                    onClick={deleteTask}
                >x</div>
            </div>
            
            {/* code for rendering subtasks */}
            {subtaskActive === 'hide' 
                ? 
            '' 
                : 
            <SubtasksList 
                subtaskActive={subtaskActive} 
                taskIdPk={props.taskIdPk} 
                taskIndex={props.taskIndex} 
                columnIndex={props.columnIndex}
            />}
        </DivTask>
    )
}

export default Task;