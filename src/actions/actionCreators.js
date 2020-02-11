import { GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAILURE } from './actionTypes'
import axios from 'axios'

let currentDate = new Date()
let currentDay = currentDate.getDay()
let startDate = new Date(); startDate.setDate(startDate.getDate() - currentDay + 1)
let endDate = new Date(); endDate.setDate(endDate.getDate() - currentDay + 15)

console.log(startDate, endDate)
export const fetchTasks = () => dispatch => {
    axios.get(`http://localhost:4000/api/tasks?startdate=${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}T00:00:00Z&enddate=${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}T00:00:00Z`)
        .then(tasks => dispatch({
            type: GET_TASKS_REQUEST,
            payload: tasks.data
        }))
}
