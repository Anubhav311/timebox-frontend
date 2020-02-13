
export function TasksReducer(state, action) {
    switch(action.type) {
        case 'GET_TASKS_REQUEST':
            return state = action.payload
        case 'GET_SUBTASKS_REQUEST':
            return state = action.payload
        default:
            return state;
    }
}
