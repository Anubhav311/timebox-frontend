import React from 'react';
import styled from 'styled-components';

import TasksList from './TasksList';

const WeekDiv = styled.div`
    display: flex;
`

function Week(props) {
    const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
        <WeekDiv>
            {nameOfDays.map( (day, key) => (
                <TasksList 
                    id={key} 
                    day={day} 
                    tasks={props.tasks} 
                    columnDate={props.columnDate[key]} 
                />
            ))}
        </WeekDiv>
    )
}

export default Week;