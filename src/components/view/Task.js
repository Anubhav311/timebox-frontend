import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { FaTrash } from "react-icons/fa"
import { IconContext } from "react-icons"

import '../../styles/Task.css'
import SubtasksList from './SubtasksList';
import { TaskContext } from '../context/TasksContext';
import TaskInputField from './TaskInputField';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import TimePicker from './TimePicker';


function Task(props) {
    const {isShowing, toggle} = useModal();
    const [isInEditMode, setIsInEditMode] = useState(false)
    const [subtaskActive, setSubtaskActive] = useState('hide')
    const {tasks, dispatch} = useContext(TaskContext)
    const updatedTasksState = [...tasks]
    const taskDueTime = tasks[props.columnIndex].tasks[props.taskIndex].task_due_at.split('T')[1].substr(0, 5)

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
    console.log(tasks[props.columnIndex].tasks[props.taskIndex].task_due_at.split('T')[1].substr(0, 5))

    return (
        <div className="task_container">
            {/* code for rendering task */}
            <div className="task-heading">
                <div className="task_text_container">
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
                        <p className="task_text" onClick={changeEditMode}>{props.task}</p>}
                    </div>
                </div>

                <div className="card_separator"></div>

                <div className="lower_items">
                    <div>
                        <button className="button-default" onClick={toggle}>{taskDueTime}</button>
                        <Modal isShowing={isShowing} hide={toggle}>
                            <TimePicker
                                taskIndex={props.taskIndex}
                                columnIndex={props.columnIndex}
                                taskIdPk={props.taskIdPk}
                            />
                        </Modal>
                    </div>

                    <IconContext.Provider value={{ style: {fontSize: '18px', color: "#8E8F91", cursor: 'pointer', marginLeft: '10px'}}}>
                        <FaTrash onClick={deleteTask}/>
                    </IconContext.Provider>
                </div>
            </div>
            
            {/* code for rendering subtasks */}
            {/* {subtaskActive === 'hide' 
                ? 
            '' 
                : 
            <SubtasksList 
                subtaskActive={subtaskActive} 
                taskIdPk={props.taskIdPk} 
                taskIndex={props.taskIndex} 
                columnIndex={props.columnIndex}
            />} */}
        </div>
    )
}

export default Task;