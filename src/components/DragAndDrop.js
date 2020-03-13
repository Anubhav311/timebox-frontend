import React, { useState, useRef, useContext } from 'react';

import './DragAndDrop.css';
import Task from './view/Task';
import { TaskContext } from './context/TasksContext';


function DragAndDrop(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    // const tasksListArray = []
    // const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    // for (let i=0; i<props.columnDate.length; i++) {
    //     tasksListArray.push({
    //         day: nameOfDays[i],
    //         tasks: []
    //     })
    //     console.log(props.tasks)
    //     for (let index = 0; index < props.tasks.length; index++) {
    //         if (props.tasks[index].task_due_at.split('T')[0] === `${props.columnDate[i].getFullYear()}-${('0' + (props.columnDate[i].getMonth() + 1)).slice(-2)}-${('0' + props.columnDate[i].getDate()).slice(-2)}`) {
    //             tasksListArray[i].tasks.push(props.tasks[index]
    //             // <Task 
    //                 // key={tasksListArray.length}
    //                 // task={props.tasks[index].task}
    //                 // taskIndex={index}
    //                 // taskIdPk={props.tasks[index].task_id_pk}
    //             // />
    //             )
    //         }
    //     }
    // }

    // const [list, setList] = useState(tasksListArray);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            let newList = JSON.parse(JSON.stringify(tasks));
            newList[params.columnI].tasks.splice(params.taskI, 0, newList[currentItem.columnI].tasks.splice(currentItem.taskI, 1)[0])
            dragItem.current = params
            dispatch({
                type: 'UPDATE_TASK_STATE',
                payload: newList
            })
        }
    }

    const handleDragEnd = () => {
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.columnI ===  params.columnI && currentItem.taskI ===  params.taskI) {
            return 'current dnd-item'
        }
        return 'dnd-item'
    }

    return (
        <div className="drag-n-drop">
            {tasks.map((column, columnI) => (
                <div 
                    key={column.day} 
                    className="dnd-group" 
                    onDragEnter={dragging && !column.tasks.length ? e => {handleDragEnter(e, {columnI, taskI: 0})} : null}
                >
                    <div className="group-title"><p>{column.day}</p></div>
                    {column.tasks.map((task, taskI) => (
                        <div 
                            draggable 
                            onDragStart={(e) => {handleDragStart(e, {columnI, taskI})}} 
                            onDragEnter={dragging ? e => {handleDragEnter(e, {columnI, taskI})} : null}
                            key={taskI} 
                            className={dragging ? getStyles({columnI, taskI}) : "dnd-item"}
                        >
                            <Task
                                key={taskI}
                                task={task.task}
                                columnIndex={columnI}
                                taskIndex={taskI}
                                taskIdPk={task.task_id_pk}
                            />
                            {/* {task.task} */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        // <div className="drag-n-drop">
        //     {list.map((grp, grpI) => (
        //         <div 
        //             key={grp.title} 
        //             className="dnd-group" 
        //             onDragEnter={dragging && !grp.items.length ? e => {handleDragEnter(e, {grpI, itemI: 0})} : null}
        //         >
        //             <div className="group-title">{grp.title}</div>
        //             {grp.items.map((item, itemI) => (
        //                 <div 
        //                     draggable 
        //                     onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}} 
        //                     onDragEnter={dragging ? e => {handleDragEnter(e, {grpI, itemI})} : null}
        //                     key={item} 
        //                     className={dragging ? getStyles({grpI, itemI}) : "dnd-item"}
        //                 >
        //                     {item}
        //                 </div>
        //             ))}
        //         </div>
        //     ))}
        // </div>
    )
}

export default DragAndDrop;