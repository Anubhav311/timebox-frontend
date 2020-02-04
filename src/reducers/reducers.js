import { GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAILURE } from '../actions/actionTypes'

export function TasksReducer(state = {tasks: []}, action) {
    switch(action.type) {
        case GET_TASKS_REQUEST:
            return {
                ...state,
                tasks: action.payload
            }
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload
            }
        case GET_TASKS_FAILURE:
            return {
                ...state,
                tasks: action.payload
            }
    }
}