import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Day from './Day';
import Today from './Today';
import Tabs from './Tabs';
import { fetchTasks } from '../actions/actionCreators'

const Week_div = styled.div`
    display: flex;
`

function Home(props) {
    useEffect(() => {
        props.fetchTasks()
    }, [])

    const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let week = nameOfDays.map( day => (
        <Day day={day} tasks={props.tasks}/>
    ))

    return (
        <div>
            <Tabs>
                <div label="today">
                    <Today/>
                </div>
                <div label="this week">
                    <Week_div>
                        {week}
                    </Week_div>
                </div>
                <div label="next week">
                    <Week_div>
                        {week}
                    </Week_div>
                </div>
            </Tabs>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state,
        tasks: state.tasks.tasks
    }
}

export default connect(mapStateToProps, { fetchTasks })(Home);