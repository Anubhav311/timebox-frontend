import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

function Subtask(props) {
    useEffect(() => {
        props.fetchSubtasks()
    }, [])

    return (
        <div>

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