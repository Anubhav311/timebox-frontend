import React, { useState, useEffect, useRef } from 'react';

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
            <InputField changeEditMode={changeEditMode} isInEditMode={isInEditMode} text={props.text}/>
                :
            <p onClick={changeEditMode} className="partName">
                {props.text}
            </p> }
        </div>
    )
}


export default Title;
