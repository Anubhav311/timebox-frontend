import React, { useState } from 'react';

import InputField from './InputField';
import Text from './Text';

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
            <Text text={props.text} changeEditMode={changeEditMode} className="partName" />}
        </div>
    )
}


export default Title;
