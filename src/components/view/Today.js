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
    let todaysTasks = []
    let todaysSubtasks = []
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
    console.log(todaysSubtasks)
    const timeboxMinutes = 5

    let iterator = 1440
    let todayTimeSlots = []
    let startHour = 0
    let startMinute = 0
    let endHour = 0
    let endMinute = 0
    let counter = 0

    for (let i = timeboxMinutes; i <= iterator; i = i + timeboxMinutes) {
        endMinute = startMinute + timeboxMinutes

        if (endMinute >= 60) {
            endHour = endHour + 1
            endMinute = 0
        }

        if (endHour === 24) {
            endHour = 0
        }

        todayTimeSlots.push(
            {
            time: `${startHour}:${startMinute} - ${endHour}:${endMinute}`,
            subtask: todaysSubtasks[counter] ? todaysSubtasks[counter].subtask : <p>do this {counter}</p>
            }
        )

        startHour = endHour
        startMinute = startMinute + timeboxMinutes

        if (startMinute >= 60) {
            startMinute = 0
        }
        counter++;
    }

    return (
        <DivToday className="today">
            {todayTimeSlots.map((num, key) => (
                <div key={key} className="timeslot">
                    <div className="slot-head">
                        <p>{num.time}</p>
                    </div>
                    <div className="slot-body">
                        {num.subtask}
                    </div>
                </div>
            ))}
        </DivToday>
    )
}