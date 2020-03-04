import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios'

import { TaskContext } from '../context/TasksContext';
import Subtask from './Subtask';
import NewSubtaskInputField from './NewSubtaskInputField';

function SubtasksList(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const [addSubtask, setAddSubtask] = useState(false)
    const tasksAndSubtasks = [...tasks]

    function AddSubtaskToggle() {
        setAddSubtask(!addSubtask)
    }

    useEffect(() => {
        axios.get(`https://timebox-be.herokuapp.com/api/subtasks?task_id_fk=${props.taskIdPk}`)
            .then(subtasks => {
                loop1: 
                for (let i = 0; i < subtasks.data.length; i++) {
                    for (let j = 0; j < tasksAndSubtasks.length; j++) {
                        if (subtasks.data[i].task_id_fk === tasksAndSubtasks[j].task_id_pk) {
                            tasksAndSubtasks[j].subtasks = [...subtasks.data]
                            break loop1;
                        }
                    }
                }
                return tasksAndSubtasks;
            })
            .then(tasksAndSubtasks => dispatch({
                type: 'GET_SUBTASKS_REQUEST',
                payload: tasksAndSubtasks
            }))
    }, [])

    const relevantTask = tasks.filter(task => task.task_id_pk === props.taskIdPk)
    let list = []
    if (relevantTask[0].subtasks) {
        list = relevantTask[0].subtasks.map((subtask, key) => (
            <Subtask 
                key={key}
                text={subtask.subtask} 
                subtaskIndex={key}
                subtaskIdPk={tasks[props.taskIndex].subtasks[key]} 
                taskIdPk={props.taskIdPk} 
                taskIndex={props.taskIndex} 
            />
        ))
    }

    list.push(
        <div key={list.length}>
            {addSubtask 
                ? 
            <NewSubtaskInputField 
                columnDate={props.columnDate} 
                addSubtask={addSubtask} 
                AddSubtaskToggle={AddSubtaskToggle} 
                taskIdPk={props.taskIdPk}
                taskIndex={props.taskIndex}
            /> 
                : 
            <button className="add-task" onClick={AddSubtaskToggle}> + </button>}
        </div>
    )


    return (
        <div>
            {list}
        </div>
    )
}

export default SubtasksList;