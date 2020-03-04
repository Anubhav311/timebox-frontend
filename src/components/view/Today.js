import React from 'react';
import styled from 'styled-components';

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
                <div id={key} className="timeslot">
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