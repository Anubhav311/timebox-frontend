import React, { useContext } from 'react';

import '../../styles/TodayStyles.css';
import { TaskContext } from '../context/TasksContext';
import { currentDate } from '../utilities/DaysOfWeek.js';
import NavBar from './NavBar';


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

            startOfTimeSlot = `${('0' + startOfDay.getHours()).slice(-2)}:${('0' + startOfDay.getMinutes()).slice(-2)}`
            startOfDay.setMinutes(startOfDay.getMinutes() + timeboxMinutes)
            endOfTimeSlot = `${('0' + startOfDay.getHours()).slice(-2)}:${('0' + startOfDay.getMinutes()).slice(-2)}`

            if ((startOfDay.getTime() - 300000) <= subTaskDueTime.getTime() && startOfDay.getTime() > subTaskDueTime.getTime()) {
                todayTimeSlots.push({
                    time: startOfTimeSlot + ' - ' + endOfTimeSlot,
                    subtask: todaysSubtasks[counter].subtask
                })
                if (counter < todaysSubtasks.length - 1) counter++;
            } else {
                todayTimeSlots.push({
                    time: startOfTimeSlot + ' - ' + endOfTimeSlot,
                    subtask: "---"
                })
            }
            temp++;

        }
    }


    return (
        <>
        <NavBar />
        <div className="today">
            {todayTimeSlots.map((slot, key) => (
                <div key={key} className="timeslot">
                    <div className="slot-head">
                        <p className="today_text">{slot.time}</p>
                    </div>
                    <div className="slot-body">
                        <p className="today_text">{slot.subtask}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}