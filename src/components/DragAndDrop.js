import React from 'react';

import './DragAndDrop.css';

const data = [
    {
        title: 'group 1', items: ['1', '2', '3']
    },
    {
        title: 'group 2', items: ['4', '5']
    },
    {
        title: 'group 3', items: ['6']
    }
]

function DragAndDrop() {
    return (
            <div className="drag-n-drop">
                {data.map((grp, grpI) => (
                    <div key={grp.title} className="dnd-group">
                        {grp.items.map((item, itemI) => (
                            <div key={item} className="dnd-item">
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            //  <div className="drag-n-drop">
            //     <div className="dnd-group">
            //         <div className="group-title">Group 1</div>
            //         <div className="dnd-item">
            //             <div>
            //                 <p>Item</p>
            //             </div>
            //         </div>
            //         <div className="dnd-item">
            //             <div>
            //                 <p>Item</p>
            //             </div>
            //         </div>
            //         <div className="dnd-item">
            //             <div>
            //                 <p>Item</p>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="dnd-group">
            //         <div className="group-title">Group 1</div>
            //         <div className="dnd-item">
            //             <div>
            //                 <p>Item</p>
            //             </div>
            //         </div>
            //         <div className="dnd-item">
            //             <div>
            //                 <p>Item</p>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="dnd-group">
            //         <div className="group-title">Group 1</div>
            //         <div className="dnd-item">
            //             <div>
            //                 <p>Item</p>
            //             </div>
            //         </div>
            //     </div>
            // </div>
    )
}

export default DragAndDrop;