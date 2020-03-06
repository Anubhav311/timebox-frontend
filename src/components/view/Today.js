import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { currentDate } from '../DaysOfWeek.js'
import { TaskContext } from '../context/TasksContext';

const DivToday = styled.div`
    width: 90%;
    margin: auto;

    .timeslot {
        width: 90%;
        margin: auto;
        display: flex;
    }

    .slot-head {
        background: red;
        width: 20%;
        padding: 5px;
    }

    .slot-body {
        background: green;
        width: 80%;
        padding: 5px;
    }
`

function getTodaysSubtasks(tasks, todaysDate, todaysTasksIds) {
    for (let i=0; i<tasks.length; i++) {
        if (tasks[i].task_due_at.split('T')[0] === todaysDate) {
            todaysTasksIds.push(tasks[i].task_id_pk)
        }
    }

    if (todaysTasksIds.length !== 0) {
        const stringifiedTodaysTasksIds = JSON.stringify(todaysTasksIds) // converting an array into a string
        
        axios.get(`http://localhost:4000/api/subtasks?tasksIds=${stringifiedTodaysTasksIds}`)
            .then(subtasks => console.log(subtasks) 
            // dispatch({
            // type: 'GET_TASKS_REQUEST',
            // payload: tasks.data
            // })
            )
            .catch(err => console.log(err))
    }
}

export default function Today() {
    const {tasks, dispatch} = useContext(TaskContext)
    const todaysTasksIds = []
    const todaysSubtasks = []
    const todaysDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;

    getTodaysSubtasks(tasks, todaysDate, todaysTasksIds)

    const timeboxMinutes = 5

    let iterator = 1440
    let todayTimeSlots = []
    let startHour = 0
    let startMinute = 0
    let endHour = 0
    let endMinute = 0

    for (let i = timeboxMinutes; i <= iterator; i = i + timeboxMinutes) {
        endMinute = startMinute + timeboxMinutes

        if (endMinute >= 60) {
            endHour = endHour + 1
            endMinute = 0
        }

        if (endHour === 24) {
            endHour = 0
        }

        todayTimeSlots.push(`${startHour}:${startMinute} - ${endHour}:${endMinute}`)

        startHour = endHour
        startMinute = startMinute + timeboxMinutes

        if (startMinute >= 60) {
            startMinute = 0
        }
    }
    return (
        <DivToday className="today">
            {todayTimeSlots.map((num, key) => (
                <div key={key} className="timeslot">
                    <div className="slot-head">
                        <p>{num}</p>
                    </div>
                    <div className="slot-body">
                        <p>do this {key}</p>
                    </div>
                </div>
            ))}
        </DivToday>
    )
}