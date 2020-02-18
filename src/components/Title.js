import React, { useState } from 'react';

import InputField from './InputField';

function Title(props) {
    const [isInEditMode, setIsInEditMode] = useState(false)

    const changeEditMode = () => {
        setIsInEditMode(!isInEditMode)
    }

    
    return (
        <div>
            {isInEditMode 
                ? 
            <InputField taskIndex={props.taskId} changeEditMode={changeEditMode} isInEditMode={isInEditMode} text={props.text}/>
                :
            <p onClick={changeEditMode}>{props.text}</p>}
        </div>
    )
}


export default Title;