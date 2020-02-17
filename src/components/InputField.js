import React, { useEffect, useRef, useState } from 'react';

function InputField(props) {
    const [inputDefaultValue, setInputDefaultValue] = useState(props.text);
    const inputRef = useRef(null);

    const changeHandler = (e) => {
        setInputDefaultValue(e.target.value);
    }
    
    useEffect(() => {
        if (props.isInEditMode) {
            console.log(inputRef.current.focus())
        }
    }, [props.isInEditMode])

    useEffect(() => {
        if (inputDefaultValue != props.text) {
            console.log('nice')
        }
    })


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