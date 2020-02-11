import { GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAILURE } from './actionTypes'
import axios from 'axios'

let currentDate = new Date()
let currentDay = currentDate.getDay()
let startDate = new Date(); startDate.setDate(startDate.getDate() - currentDay + 1)
let endDate = new Date(); endDate.setDate(endDate.getDate() - currentDay + 15)

console.log(startDate, endDate)
export const fetchTasks = () => dispatch => {
    axios.get(`http://localhost:4000/api/tasks?startdate=${startDate}`)
        .then(tasks => dispatch({
            type: GET_TASKS_REQUEST,
            payload: tasks.data
        }))
}
