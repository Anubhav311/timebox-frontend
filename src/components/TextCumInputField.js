import React from 'react';
import { useState, useEffect, useRef } from 'react'

function Title(props) {
    const [isInEditMode, setIsInEditMode] = useState(false)
    let children = props.taskText

    const inputRef = useRef(null);
    
    useEffect(() => {
        if (isInEditMode) {
            inputRef.current.focus()
        }
    }, [isInEditMode])

    const changeEditMode = () => {
        setIsInEditMode(!isInEditMode)
    }

    const changeHandler = (e) => {
        children = e.target.value
    }

    return (
        <div>
            {isInEditMode 
                ? 
            <input 
                onChange={changeHandler}
                onBlur={changeEditMode}
                type="text"
                ref={inputRef}
                defaultValue={children}
            />
                :
            <p onClick={changeEditMode} className="partName">
                {children}
            </p> }
        </div>
    )
}


export default Title;
