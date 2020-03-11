import React from 'react';

import './DragAndDrop.css';

function DragAndDrop() {
    return (
        <div className="drag-n-drop">
            <div className="dnd-group">
                <div className="dnd-item">
                    <div>
                        <p>Item</p>
                    </div>
                </div>
                <div className="dnd-item">
                    <div>
                        <p>Item</p>
                    </div>
                </div>
                <div className="dnd-item">
                    <div>
                        <p>Item</p>
                    </div>
                </div>
            </div>
            <div className="dnd-group">
                <div className="dnd-item">
                    <div>
                        <p>Item</p>
                    </div>
                </div>
                <div className="dnd-item">
                    <div>
                        <p>Item</p>
                    </div>
                </div>
            </div>
            <div className="dnd-group">
                <div className="dnd-item">
                    <div>
                        <p>Item</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DragAndDrop;