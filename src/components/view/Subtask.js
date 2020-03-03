import React, { useState } from 'react';

import SubtaskInputField from './SubtaskInputField';

function Subtask(props) {
    const [isInEditMode, setIsInEditMode] = useState(false)

    const changeEditMode = () => {
        setIsInEditMode(!isInEditMode)
    }


    return (
        <div>
            {isInEditMode 
                ? 
            <SubtaskInputField 
                name={props.name} 
                changeEditMode={changeEditMode} 
                isInEditMode={isInEditMode} 
                text={props.text}
                taskIndex={props.taskIndex}
                subtaskIndex={props.subtaskIndex}
                subtaskIdPk={props.subtaskIdPk}
            />
                :
            <p onClick={changeEditMode}>{props.text}</p>}
        </div>
    )
}


export default Subtask;
