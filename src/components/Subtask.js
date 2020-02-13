import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios'

import { fetchSubtasks } from '../actions/actionCreators';
import { TaskContext } from './context/TasksContext';

// const Div_subtask = styled.div`
//     .subtasks {
//         display: block;
//     }

//     .hide {
//         display: none;
//     }
// `

function Subtask(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    let tasksAndSubtasks = [...tasks]
    useEffect(() => {
        axios.get(`http://localhost:4000/api/subtasks?task_id_fk=${props.taskId}`)
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
    console.log(props)

    return (
        <div>
            <p>subtask</p>
            <p>subtask</p>
            <p>subtask</p>
        </div>
    )
}

// function mapStateToProps(state) {
//     console.log(state)
//     return {
//         ...state,
//         subtasks: state.subtasks.subtasks
//     }
// }

// export default connect(mapStateToProps, { fetchSubtasks })(Subtask);
export default Subtask;