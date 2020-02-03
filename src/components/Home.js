import React from 'react';
import styled from 'styled-components';

import Day from './Day';
import Today from './Today';
import Tabs from './Tabs';

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
            <Tabs>
                <div label="week">
                    <Week_div>
                        {week}
                    </Week_div>
                </div>
                <div label="today">
                    <Today/>
                </div>
            </Tabs>
        </div>
    )
}

export default Home;