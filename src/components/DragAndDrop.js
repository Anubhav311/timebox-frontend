import React, { useState } from 'react';

import './DragAndDrop.css';


function DragAndDrop(props) {
    const [list, setList] = useState(props.data)
    return (
        <div className="drag-n-drop">
            {list.map((grp, grpI) => (
                <div key={grp.title} className="dnd-group">
                    <div className="group-title">{grp.title}</div>
                    {grp.items.map((item, itemI) => (
                        <div draggable key={item} className="dnd-item">
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default DragAndDrop;