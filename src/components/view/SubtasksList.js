import React, { useEffect, useContext } from 'react';
import axios from 'axios'

import { TaskContext } from '../context/TasksContext';
import Subtask from './Subtask';


function SubtasksList(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const tasksAndSubtasks = [...tasks]

    useEffect(() => {
        axios.get(`https://timebox-be.herokuapp.com/api/subtasks?task_id_fk=${props.taskIdPk}`)
            .then(subtasks => {
                loop1: 
                for (let i = 0; i < subtasks.data.length; i++) {
                loop2:     
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
                text={subtask.subtask} 
                name='subtask' 
                subtaskIndex={key}
                subtaskIdPk={tasks[props.taskIndex].subtasks[key]} 
                taskIdPk={props.taskIdPk} 
                taskIndex={props.taskIndex} 
            />
        ))
    }

    return (
        <div>
            {list}
        </div>
    )
}

export default SubtasksList;