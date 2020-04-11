import React, { useState, useContext } from 'react';
import Axios from 'axios';

import SubtaskInputField from './SubtaskInputField';
import { TaskContext } from '../context/TasksContext';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import TimePicker from './TimePicker';
import '../../styles/SubtaskStyles.css';

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

    return (
        <div className="subtasks_container">
            <div className="top_container">
                <button className="button-default" onClick={toggle}>o</button>
                <Modal isShowing={isShowing} hide={toggle}>
                    <TimePicker
                        taskIndex={props.taskIndex}
                        columnIndex={props.columnIndex}
                        subtaskIndex={props.subtaskIndex}
                        taskIdPk={props.taskIdPk}
                        subtaskIdPk={props.subtaskIdPk}
                    />
                </Modal>
                <div 
                    style={{
                        marginLeft: '10px', 
                        cursor: 'pointer'
                    }} 
                    onClick={deleteSubtask}
                >x</div>
            </div>
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
                <p className="subtask_text" onClick={changeEditMode}>{props.text}</p>
            </div>}
        </div>
    )
}


export default Subtask;
