import React, { useState, useContext } from 'react';
import Axios from 'axios';

import SubtaskInputField from './SubtaskInputField';
import { TaskContext } from '../context/TasksContext';
import Modal from './Modal';
import useModal from '../hooks/useModal';

function Subtask(props) {
    const [isInEditMode, setIsInEditMode] = useState(false)
    const {tasks, dispatch} = useContext(TaskContext)
    const {isShowing, toggle} = useModal();
    const updatedTasksState = [...tasks]

    const changeEditMode = () => {
        setIsInEditMode(!isInEditMode)
    }

    function deleteSubtask() {
        updatedTasksState[props.columnIndex].tasks[props.taskIndex].subtasks.splice(props.subtaskIndex, 1)
        
        Axios.delete(`https://timebox-be.herokuapp.com/api/subtasks?subtask_id_pk=${props.subtaskIdPk}`)
            .then(res => {
                if (props.subtaskIdPk === res.data[0]) {
                    dispatch({
                        type: 'DELETE_SUBTASK',
                        payload: updatedTasksState
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    console.log(props)
    return (
        <div>
            {isInEditMode 
                ? 
            <SubtaskInputField 
                changeEditMode={changeEditMode} 
                isInEditMode={isInEditMode} 
                text={props.text}
                columnIndex={props.columnIndex}
                taskIndex={props.taskIndex}
                subtaskIndex={props.subtaskIndex}
                subtaskIdPk={props.subtaskIdPk}
            />
                :
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between'
            }}>
                <p onClick={changeEditMode}>{props.text}</p>
                <div 
                    style={{
                        marginLeft: '10px', 
                        cursor: 'pointer'
                    }} 
                    onClick={deleteSubtask}
                >x</div>
            </div>}
            <Modal
                isShowing={isShowing}
                hide={toggle}
                taskIndex={props.taskIndex}
                columnIndex={props.columnIndex}
                taskIdPk={props.taskIdPk}
            />
        </div>
    )
}


export default Subtask;
