import { 
    GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASKS_FAILURE,
    GET_SUBTASKS_REQUEST, GET_SUBTASKS_SUCCESS, GET_SUBTASKS_FAILURE 
} from '../actions/actionTypes'

export function TasksReducer(state, action) {
    switch(action.type) {
        case GET_TASKS_REQUEST:
            return state = action.payload
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
        default:
            return state;
    }
}

export function SubtasksReducer(state = {subtasks: []}, action) {
    switch(action.type) {
        case GET_SUBTASKS_REQUEST:
            return {
                ...state,
                subtasks: action.payload
            }
        case GET_SUBTASKS_SUCCESS:
            return {
                ...state,
                subtasks: action.payload
            }
        case GET_SUBTASKS_FAILURE:
            return {
                ...state,
                subtasks: action.payload
            }
        default:
            return state;
    }
}