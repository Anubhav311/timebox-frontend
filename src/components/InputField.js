import React, { useEffect } from 'react';

function InputField(props) {
    let children = props.text

    const changeHandler = (e) => {
        children = e.target.value
    }
    console.log(props)

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
            ref={props.inputRef}
            defaultValue={children}
        />

    )
}

export default InputField;