import React from 'react';
import styled from 'styled-components';

import Accordion from './Accordion';

const Div_task = styled.div`
    display: flex;
    align-items: center;

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: yellow;
        margin-right: 10px;
    }
`

function Task(props) {
    return (
        <Div_task>
            <div className="dot"></div>
            <p>{props.task}</p>
            {/* <Accordion title={'abcdef'} content='abcd'/> */}
        </Div_task>
    )
}

export default Task;