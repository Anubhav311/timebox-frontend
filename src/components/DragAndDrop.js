import React, { useState, useRef, useContext } from 'react';

import './DragAndDrop.css';
import Task from './view/Task';
import { TaskContext } from './context/TasksContext';
import NewTaskInputField from './view/NewTaskInputField';


function DragAndDrop(props) {
    const {tasks, dispatch} = useContext(TaskContext)
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
            {/* {tasksRender} */}
            {console.log(tasks)}
            {tasks.filter((date, key) => {
                if (props.columnDate[0].getDate() === tasks[0].date) {
                    return tasks.indexOf(date) < 7;
                }
                if (props.columnDate[0].getDate() === tasks[7].date) {
                    console.log(props.columnDate[0].getDate(), tasks[0].date, tasks[7].date, key)
                    return tasks.indexOf(date) > 6;
                }
                return false;
            }).map((column, columnI) => (
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
                        </div>
                    )).concat(
                        <NewTaskInputField 
                            columnDate={props.columnDate[columnI]} 
                            columnIndex={columnI} 
                        />)}
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