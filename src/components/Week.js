import React from 'react';
import styled from 'styled-components';

import Day from './Day';
import Accordion from './Accordion';

const Week_div = styled.div`
    display: flex;
`

function Week(props) {
    const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let week = nameOfDays.map( (day, key) => (
        <Day day={day} tasks={props.tasks} columnDate={props.columnDate[key]} />
    ))

    return (
        <Week_div>
            {week}
            {/* <Accordion
                title = 'test title'
                content = 'test content wwwwwwwwwww wwwwwww www ww ww wwwww  wwwwww wwwww www wwww www w wfa aewf awef awef ar'
            /> */}
        </Week_div>
    )
}

export default Week;