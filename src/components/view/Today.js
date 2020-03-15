import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { TaskContext } from '../context/TasksContext';
import { currentDate } from '../DaysOfWeek.js'

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


export default function Today(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const startOfDay = new Date();
    const timeboxMinutes = 5
    const iterator = 1440
    let todaysTasks = []
    let todaysSubtasks = []
    let todayTimeSlots = []
    let counter = 0
    let startOfTimeSlot;
    let endOfTimeSlot;

    startOfDay.setHours(0,0,0,0)

    if (tasks.length) {
        todaysTasks = tasks.filter(column => {
            return column.date === currentDate.getDate();
        })
        for (let i=0; i<todaysTasks[0].tasks.length; i++) {
            for (let j=0; j<todaysTasks[0].tasks[i].subtasks.length; j++) {
                todaysSubtasks.push(todaysTasks[0].tasks[i].subtasks[j])
            }
        }
    }

    for (let i=0; i<iterator; i = i+timeboxMinutes) {
        startOfTimeSlot = `${startOfDay.getHours()}:${startOfDay.getMinutes()}`
        startOfDay.setMinutes(startOfDay.getMinutes() + timeboxMinutes)
        endOfTimeSlot = `${startOfDay.getHours()}:${startOfDay.getMinutes()}`

        todayTimeSlots.push(
            {
            time: startOfTimeSlot + ' - ' + endOfTimeSlot,
            subtask: todaysSubtasks[counter] ? todaysSubtasks[counter].subtask : <p> -- </p>
            }
        )

        counter++;
    }


    return (
        <DivToday className="today">
            {todayTimeSlots.map((slot, key) => (
                <div key={key} className="timeslot">
                    <div className="slot-head">
                        <p>{slot.time}</p>
                    </div>
                    <div className="slot-body">
                        {slot.subtask}
                    </div>
                </div>
            ))}
        </DivToday>
    )
}