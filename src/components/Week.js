import React from 'react';
import styled from 'styled-components';

import Day from './Day';

const Week_div = styled.div`
    display: flex;
`

function Week(props) {
    let currentDate = new Date()
    let currentDay = currentDate.getDay()
    let day1 = new Date(); day1.setDate(day1.getDate() - currentDay + 1)
    let day2 = new Date(); day2.setDate(day2.getDate() - currentDay + 2)
    let day3 = new Date(); day3.setDate(day3.getDate() - currentDay + 3)
    let day4 = new Date(); day4.setDate(day4.getDate() - currentDay + 4)
    let day5 = new Date(); day5.setDate(day5.getDate() - currentDay + 5)
    let day6 = new Date(); day6.setDate(day6.getDate() - currentDay + 6)
    let day7 = new Date(); day7.setDate(day7.getDate() - currentDay + 7)
    let day8 = new Date(); day8.setDate(day8.getDate() - currentDay + 8)
    let day9 = new Date(); day9.setDate(day9.getDate() - currentDay + 9)
    let day10 = new Date(); day10.setDate(day10.getDate() - currentDay + 10)
    let day11 = new Date(); day11.setDate(day11.getDate() - currentDay + 11)
    let day12 = new Date(); day12.setDate(day12.getDate() - currentDay + 12)
    let day13 = new Date(); day13.setDate(day13.getDate() - currentDay + 13)
    let day14 = new Date(); day14.setDate(day14.getDate() - currentDay + 14)
    let daysArray = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14]
    console.log(daysArray)
    const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let week = nameOfDays.map( (day, key) => (
        <Day day={day} tasks={props.tasks} columnDate={daysArray[key]} />
    ))

    return (
        <Week_div>
            {week}
        </Week_div>
    )
}

export default Week;