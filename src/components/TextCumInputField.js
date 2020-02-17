import React, { useState, useEffect, useRef } from 'react';

import InputField from './InputField';


function Title(props) {
    const [isInEditMode, setIsInEditMode] = useState(false)
    const inputRef = useRef(null);

    useEffect(() => {
        if (isInEditMode) {
            inputRef.current.focus()
        }
    }, [isInEditMode])

    const changeEditMode = () => {
        setIsInEditMode(!isInEditMode)
    }


    return (
        <div>
            {isInEditMode 
                ? 
            <InputField changeEditMode={changeEditMode} inputRef={inputRef}/>
                :
            <p onClick={changeEditMode} className="partName">
                {props.text}
            </p> }
        </div>
    )
}


export default Title;
