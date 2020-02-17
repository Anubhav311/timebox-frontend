import React, { useEffect, useRef, useState } from 'react';

function InputField(props) {
    const [inputDefaultValue, setInputDefaultValue] = useState(props.text);
    const inputRef = useRef(null);

    const changeHandler = (e) => {
        setInputDefaultValue(e.target.value);
    }
    
    useEffect(() => {
        if (props.isInEditMode) {
            inputRef.current.focus()
        }
    }, [props.isInEditMode])


    return (
        <input 
            onChange={changeHandler}
            onBlur={props.changeEditMode}
            type="text"
            ref={inputRef}
            defaultValue={inputDefaultValue}
        />
    )
}

export default InputField;