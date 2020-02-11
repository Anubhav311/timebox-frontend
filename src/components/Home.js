import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Today from './Today';
import Tabs from './Tabs';
import { fetchTasks } from '../actions/actionCreators';
import Week from './Week';


function Home(props) {
    useEffect(() => {
        props.fetchTasks()
    }, [])


    return (
        <div>
            <Tabs>
                <div label="today">
                    <Today/>
                </div>
                <div label="this week">
                    <Week tasks={props.tasks}/>
                </div>
                <div label="next week">
                    <Week tasks={props.tasks}/>
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