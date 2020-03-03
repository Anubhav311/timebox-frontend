import React from 'react';
import styled from 'styled-components';

import Day from './Day';

const Week_div = styled.div`
    display: flex;
`

function Week(props) {
    const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let week = nameOfDays.map( (day, key) => (
        <Day 
            id={key} 
            day={day} 
            tasks={props.tasks} 
            columnDate={props.columnDate[key]} 
        />
    ))

    return (
        <Week_div>
            {week}
        </Week_div>
    )
}

export default Week;