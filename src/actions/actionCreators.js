import axios from 'axios'

import { 
    GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAILURE,
    GET_SUBTASKS_REQUEST, GET_SUBTASKS_SUCCESS, GET_SUBTASKS_FAILURE 
} from './actionTypes'
import { day1, day15 } from '../components/DaysOfWeek';

export const fetchTasks = () => dispatch => {
    axios.get(`http://localhost:4000/api/tasks?startdate=${day1.getFullYear()}-${('0' + (day1.getMonth() + 1)).slice(-2)}-${('0' + day1.getDate()).slice(-2)}T00:00:00Z&enddate=${day15.getFullYear()}-${('0' + (day15.getMonth() + 1)).slice(-2)}-${('0' + day15.getDate()).slice(-2)}T00:00:00Z`)
        .then(tasks => dispatch({
            type: GET_TASKS_REQUEST,
            payload: tasks.data
        }))
}

export const fetchSubtasks = () => dispatch => {
    axios.get(`http://localhost:4000/api/subtasks?task_id_fk=1`)
        .then(subtasks => dispatch({
            type: GET_SUBTASKS_REQUEST,
            payload: subtasks.data
        }))
}