import React, { useContext } from 'react';
import styled from 'styled-components';

import { TaskContext } from '../context/TasksContext';
import { currentDate } from '../DaysOfWeek.js'
import './TodayStyles.css';

// const DivToday = styled.div`
//     width: 90%;
//     margin: auto;

//     .timeslot {
//         width: 100%;
//         margin: auto;
//         display: flex;
//         border-bottom: 1px solid #8E8F91;
//     }

//     .slot-head {
//         border-right: 1px solid #8E8F91;
//         width: 20%;
//     }

//     .slot-body {
//         width: 80%;
//     }

//     p {
//         margin: 8px;
//     }
// `


export default function Today(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0)
    const timeboxMinutes = 5
    const iterator = 1440
    let todaysTasks = []
    let todaysSubtasks = []
    let todayTimeSlots = []
    let counter = 0
    let startOfTimeSlot;
    let endOfTimeSlot;

    if (tasks.length) {
        //extracting todays tasks
        todaysTasks = tasks.filter(column => {
            return column.columnDate.getDate() === currentDate.getDate();
        })

        //extracting todays subtasks
        for (let i=0; i<todaysTasks[0].tasks.length; i++) {
            for (let j=0; j<todaysTasks[0].tasks[i].subtasks.length; j++) {
                todaysSubtasks.push(todaysTasks[0].tasks[i].subtasks[j])
            }
        }

        //matching todays subtasks with time slots
        let temp = 0
        for (let i=0; i<iterator; i = i+timeboxMinutes) {
            const subTaskDueTime = new Date(todaysSubtasks[counter].subtask_due_at)

            startOfTimeSlot = `${startOfDay.getHours()}:${startOfDay.getMinutes()}`
            startOfDay.setMinutes(startOfDay.getMinutes() + timeboxMinutes)
            endOfTimeSlot = `${startOfDay.getHours()}:${startOfDay.getMinutes()}`

            if ((startOfDay.getTime() - 300000) <= subTaskDueTime.getTime() && startOfDay.getTime() > subTaskDueTime.getTime()) {
                todayTimeSlots.push({
                    time: startOfTimeSlot + ' - ' + endOfTimeSlot,
                    subtask: todaysSubtasks[counter].subtask
                })
                if (counter < todaysSubtasks.length - 1) counter++;
            } else {
                todayTimeSlots.push({
                    time: startOfTimeSlot + ' - ' + endOfTimeSlot,
                    subtask: <p>---</p>
                })
            }
            temp++;

        }
    }


    return (
        <div className="today">
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
        </div>
    )
}