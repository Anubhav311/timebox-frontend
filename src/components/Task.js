import React, { useState } from 'react';
import styled from 'styled-components';

import Accordion from './Accordion';

const Div_task = styled.div`
    .task-heading {
        display: flex;
        align-items: center;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: yellow;
        margin-right: 10px;
    }

    .subtasks {
        display: block;
    }

    .hide {
        display: none;
    }
`

function Task(props) {
    const [subtaskActive, setSubtaskActive] = useState('hide')

    function toggleSubtask() {
        setSubtaskActive(subtaskActive === 'hide' ? 'subtasks' : 'hide')
    }

    return (
        <Div_task>
            <div className="task-heading">
                <div className="dot" onClick={toggleSubtask}></div>
                <p>{props.task}</p>
            </div>
                <p className={`${subtaskActive}`}>subtask</p>
            {/* <Accordion title={'abcdef'} content='abcd'/> */}
        </Div_task>
    )
}

export default Task;