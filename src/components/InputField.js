import React, { useEffect, useRef } from 'react';

function InputField(props) {
    let children = props.text
    const inputRef = useRef(null);

    const changeHandler = (e) => {
        children = e.target.value
    }
    
    useEffect(() => {
        if (props.isInEditMode) {
            inputRef.current.focus()
        }
    }, [props.isInEditMode])

    useEffect(() => {
        if (children != props.text) {
            console.log('nice')
        }
    })


    return (
        <input 
            onChange={changeHandler}
            onBlur={props.changeEditMode}
            type="text"
            ref={inputRef}
            defaultValue={children}
        />

    )
}

export default InputField;