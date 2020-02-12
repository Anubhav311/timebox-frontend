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
    // if (props.subtaskActive === 'subtasks') {

    // }
    useEffect(() => {
        console.log('working')
        props.fetchSubtasks(props.taskId)
    }, [])

    return (
        <div>
            <p>subtask</p>
            <p>subtask</p>
            <p>subtask</p>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state,
        subtasks: state.subtasks.subtasks
    }
}

export default connect(mapStateToProps, { fetchSubtasks })(Subtask);