import React from 'react';
import styled from 'styled-components';

const Div_day = styled.div`
    background: red;
    width: 20%;
    height: auto;

    .day-header {
        height: 50px;
    }

    .day-body {

    }
`

export default function Day() {
    return (
        <Div_day className="day">
            <div className="day-header">
                <p>Monday</p>
            </div>
            <div className="day-body">
                <p>task</p>
            </div>
        </Div_day>
    )
}