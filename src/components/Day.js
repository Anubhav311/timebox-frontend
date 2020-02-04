import React from 'react';
import styled from 'styled-components';


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

    return (
        <Div_day className="day">
            <div className="day-header">
                <p>{props.day}</p>
            </div>
            <div className="day-body">
                <p>task</p>
                <p>task</p>
                <p>task</p>
            </div>
        </Div_day>
    )
}

export default Day;