import React, { useState, useContext } from 'react';
import Axios from 'axios';

import SubtaskInputField from './SubtaskInputField';
import { TaskContext } from '../context/TasksContext';

function Subtask(props) {
    const [isInEditMode, setIsInEditMode] = useState(false)
    const {tasks, dispatch} = useContext(TaskContext)
    const updatedTasksState = [...tasks]

    const changeEditMode = () => {
        setIsInEditMode(!isInEditMode)
    }

    function deleteSubtask() {
        updatedTasksState[props.taskIndex].subtasks.splice(props.subtaskIndex, 1)
        
        Axios.delete(`http://localhost:4000/api/subtasks?subtask_id_pk=${props.subtaskIdPk}`)
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
        <div>
            {isInEditMode 
                ? 
            <SubtaskInputField 
                changeEditMode={changeEditMode} 
                isInEditMode={isInEditMode} 
                text={props.text}
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
        </div>
    )
}


export default Subtask;
