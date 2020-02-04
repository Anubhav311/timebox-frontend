import { GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAILURE } from './actionTypes'
import axios from 'axios'


export const fetchTasks = () => dispatch => {
    axios.get('https://timebox-be.herokuapp.com/api/tasks')
        .then(tasks => dispatch({
            type: GET_TASKS_REQUEST,
            payload: tasks.data
        }))
}
