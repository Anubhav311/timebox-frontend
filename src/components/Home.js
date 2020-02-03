import React from 'react';
import styled from 'styled-components';

import Day from './Day';
import Today from './Today';

const Week_div = styled.div`
    display: flex;
`

function Home() {

    const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let week = nameOfDays.map( day => (
        <Day day={day}/>
    ))

    let now = new Date()
    console.log(now - 5)

    return (
        <div>
            <Week_div>
                {week}
            </Week_div>
            <Today/>
        </div>
    )
}

export default Home;