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
    // console.log(props.tasks[1].task_due_at, props.columnDate, props.tasks)
    console.log(`${props.columnDate.getFullYear()}-${props.columnDate.getMonth() + 1}-${props.columnDate.getDate()}`)
    let tasksList = []

    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].task_due_at.split('T')[0] == `${props.columnDate.getFullYear()}-${('0' + (props.columnDate.getMonth() + 1)).slice(-2)}-${('0' + props.columnDate.getDate()).slice(-2)}`) {
            tasksList.push(<Task task={props.tasks[i].task} />) 
        }
    }

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