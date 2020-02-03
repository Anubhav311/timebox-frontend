import React from 'react';
import styled from 'styled-components';


export default function Today(props) {

    const timeboxMinutes = 10

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

        if (endHour == 24) {
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
        <div className="today">
            {todayTimeSlots.map(num => (
                <div>
                    {num}
                </div>
            ))}
        </div>
    )
}