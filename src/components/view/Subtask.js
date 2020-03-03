import React, { useState } from 'react';

import InputField from './InputField';

function Subtask(props) {
    const [isInEditMode, setIsInEditMode] = useState(false)

    const changeEditMode = () => {
        setIsInEditMode(!isInEditMode)
    }


    return (
        <div>
            {isInEditMode 
                ? 
            <InputField 
                name={props.name} 
                taskIndex={props.taskIndex} 
                changeEditMode={changeEditMode} 
                isInEditMode={isInEditMode} 
                text={props.text}
            />
                :
            <p onClick={changeEditMode}>{props.text}</p>}
        </div>
    )
}


export default Subtask;