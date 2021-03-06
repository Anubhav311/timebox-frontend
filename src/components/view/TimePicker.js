import React, { useState, useContext } from 'react';
import axios from 'axios';

import '../../styles/TimePicker.css';
import { TaskContext } from '../context/TasksContext';
import { GetLocalISOTimeString } from '../utilities/DaysOfWeek';

function TimePicker(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const [timeState, setTimeState] = useState({
        hour: props.subtaskIndex 
                ? 
            parseInt(tasks[props.columnIndex].tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask_due_at.split('T')[1].slice(0, 2)) 
                : 
            parseInt(tasks[props.columnIndex].tasks[props.taskIndex].task_due_at.split('T')[1].slice(0, 2)),
        minute: props.subtaskIndex 
                ? 
            parseInt(tasks[props.columnIndex].tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask_due_at.split('T')[1].slice(3, 5)) 
                : 
            parseInt(tasks[props.columnIndex].tasks[props.taskIndex].task_due_at.split('T')[1].slice(3, 5))
    })
    const timeBox = 5

    const hour_up = () => {
        let newHour = timeState.hour + 1
        if (newHour > 23) {
            newHour = 0
        } 

        setTimeState({...timeState, hour: newHour});
    }

    function hour_down() {
        let newHour = timeState.hour - 1;
        if (newHour < 0) {
            newHour = 23;
        }

        setTimeState({...timeState, hour: newHour});
    }

    function minute_up() {
        let newMinute = timeState.minute + timeBox;

        if (newMinute > 59) {
            newMinute = 0;
        }

        setTimeState({...timeState, minute: newMinute});
    }

    function minute_down() {
        let newMinute = timeState.minute - timeBox;

        if (newMinute < 0) {
            newMinute = 60 - timeBox;
        }

        setTimeState({...timeState, minute: newMinute})
    }

    function updateTime(e) {
        e.preventDefault()
        const newTasks = [...tasks]
        const localISOTimeString = GetLocalISOTimeString(tasks[props.columnIndex].columnDate)
        // const newTasks = JSON.parse(JSON.stringify(tasks)); //can't use deep copy because its turning tasks[0].date object into a string.

        if (props.subtaskIndex !== undefined) {
            const updatedTaskDueAt = localISOTimeString.split('T')[0] + `T${('0' + timeState.hour).slice(-2)}:${('0' + timeState.minute).slice(-2)}:00.000`
            newTasks[props.columnIndex].tasks[props.taskIndex].subtasks[props.subtaskIndex].subtask_due_at = updatedTaskDueAt
            let payload = {
                id: props.subtaskIdPk, 
                payload: {
                    'subtask_due_at': updatedTaskDueAt
                }
            }
    
            axios.put('https://timebox-be.herokuapp.com/api/subtasks', payload)
                .then(res => {
                    dispatch({
                        type: 'UPDATE_SUBTASK_STATE',
                        payload: newTasks
                    })
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.message)
                })
        } else {
            const updatedTaskDueAt = localISOTimeString.split('T')[0] + `T${('0' + timeState.hour).slice(-2)}:${('0' + timeState.minute).slice(-2)}:00.000`
            newTasks[props.columnIndex].tasks[props.taskIndex].task_due_at = updatedTaskDueAt
            let payload = {
                id: props.taskIdPk, 
                payload: {
                    'task_due_at': updatedTaskDueAt
                }
            }
    
            axios.put('https://timebox-be.herokuapp.com/api/tasks', payload)
                .then(res => {
                    dispatch({
                        type: 'UPDATE_TASK_STATE',
                        payload: newTasks
                    })
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }
    let d = new Date(tasks[props.columnIndex].tasks[props.taskIndex].task_due_at)


    return (
        <div className="time-picker-container" >
                <div className="time-picker" dataTime="00:00">
                    <div className="hour">
                        <div className="hour-up" onClick={hour_up} ></div>
                        <input readOnly type="number" className="hr" value={timeState.hour} />
                        <div className="hour-down" onClick={hour_down} ></div>
                    </div>

                    <div className="separator">:</div>

                    <div className="minute">
                        <div className="minute-up" onClick={minute_up} ></div>
                        <input readOnly type="number" className="mn" value={timeState.minute} />
                        <div className="minute-down" onClick={minute_down} ></div>
                    </div>
                    <button className="timepicker_button" onClick={updateTime}>Update</button>
                </div>
        </div>
    )
}

export default TimePicker;