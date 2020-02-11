import React from 'react';
import styled from 'styled-components';

import Task from './Task';

const Div_day = styled.div`
    background: red;
    width: 20%;
    height: auto;
    margin: 10px;
    padding: 10px;

    .day-header {
        height: 50px;
    }

    .day-body {

    }
`

function Day(props) {
    console.log(props.tasks)
    let tasksList = props.tasks.map((task, key) => (
        <Task task={task.task} />
    ))

    return (
        <Div_day className="day">
            <div className="day-header">
                <p>{props.day}</p>
            </div>
            <div className="day-body">
                {tasksList}
            </div>
        </Div_day>
    )
}

export default Day;