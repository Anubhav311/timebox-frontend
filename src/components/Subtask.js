import React, { useEffect, useContext } from 'react';
import axios from 'axios'

import { TaskContext } from './context/TasksContext';
import Title from './Title';


function Subtask(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const tasksAndSubtasks = [...tasks]

    useEffect(() => {
        axios.get(`https://timebox-be.herokuapp.com/api/subtasks?task_id_fk=${props.taskId}`)
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
                console.log(tasksAndSubtasks, props.taskId)
                return tasksAndSubtasks;
            })
            .then(tasksAndSubtasks => dispatch({
                type: 'GET_SUBTASKS_REQUEST',
                payload: tasksAndSubtasks
            }))
    }, [])

    const relevantTask = tasks.filter(task => task.task_id_pk === props.taskId)
    let subtasksList = []
    if (relevantTask[0].subtasks) {
        subtasksList = relevantTask[0].subtasks.map((subtask, key) => (
            <Title id={key} text={subtask.subtask} name='subtask' taskId={props.taskId} />
        ))
    }

    return (
        <div>
            {subtasksList}
        </div>
    )
}

export default Subtask;