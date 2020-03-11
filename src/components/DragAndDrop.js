import React, { useState, useRef } from 'react';

import './DragAndDrop.css';


function DragAndDrop(props) {
    const [list, setList] = useState(props.data);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        console.log('draging', params)
        dragItem.current = params;
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setDragging(true)
    }

    const handleDragEnd = () => {
        console.log('dragend')
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.grpI ===  params.grpI && currentItem.itemI ===  params.itemI) {
            return 'current dnd-item'
        }
        return 'dnd-item'
    }

    return (
        <div className="drag-n-drop">
            {list.map((grp, grpI) => (
                <div key={grp.title} className="dnd-group">
                    <div className="group-title">{grp.title}</div>
                    {grp.items.map((item, itemI) => (
                        <div 
                            draggable 
                            onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}} 
                            key={item} 
                            className={dragging ? getStyles({grpI, itemI}) : "dnd-item"}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default DragAndDrop;