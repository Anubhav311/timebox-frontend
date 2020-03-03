
export function TasksReducer(state, action) {
    switch(action.type) {
        case 'GET_TASKS_REQUEST':
            return state = action.payload
        case 'GET_SUBTASKS_REQUEST':
            return state = action.payload
        case 'UPDATE_TASK_STATE':
            return state = action.payload
        case 'DELETE_TASK':
            return state = action.payload
        case 'UPDATE_SUBTASK_STATE':
            return state = action.payload
        default:
            return state;
    }
}
