import React from 'react';

function Text(props) {
    return (
        <p onClick={props.changeEditMode}>{props.text}</p>
    )
}

export default Text;