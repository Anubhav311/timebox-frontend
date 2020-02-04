import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { fetchTasks } from '../actions/actionCreators'


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

    useEffect(() => {
        axios.get('https://timebox-be.herokuapp.com/api/tasks')
            .then(payload => console.log(payload))
    })

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

function mapStateToProps(state) {
    return {
        ...state,
        tasks: state.tasks.tasks
    }
}

export default connect(mapStateToProps, { fetchTasks })(Day);