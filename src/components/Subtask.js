import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchSubtasks } from '../actions/actionCreators';

// const Div_subtask = styled.div`
//     .subtasks {
//         display: block;
//     }

//     .hide {
//         display: none;
//     }
// `

function Subtask(props) {
    // for (let i = 0; i < props.tasks.length; i++) {
    //     if (props.tasks[i].task_id_pk === )
    // }
    useEffect(() => {
        console.log('working')
        props.fetchSubtasks(props.taskId)
    }, [])
    console.log(props)
    return (
        <div>
            <p>subtask</p>
            <p>subtask</p>
            <p>subtask</p>
        </div>
    )
}

function mapStateToProps(state) {
    console.log(state)
    return {
        ...state,
        subtasks: state.subtasks.subtasks
    }
}

export default connect(mapStateToProps, { fetchSubtasks })(Subtask);