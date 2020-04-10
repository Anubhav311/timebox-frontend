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
            // let newList = JSON.parse(JSON.stringify(tasks)); //can't use deep copy because its turning tasks[0].date object into a string.
            let newList = [...tasks]
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

    console.log(tasks)
    return (
        <div className="drag-n-drop">
            {tasks.filter((date, key) => {
                if (props.columnDate[0].getDate() === tasks[0].columnDate.getDate()) {
                    return tasks.indexOf(date) < 7;
                }
                if (props.columnDate[0].getDate() === tasks[7].columnDate.getDate()) {
                    return tasks.indexOf(date) > 6;
                }
                return false;
            }).map((column, columnI) => (
                <div 
                    key={column.day} 
                    className="dnd-group" 
                    onDragEnter={dragging && !column.tasks.length ? e => {handleDragEnter(e, {columnI, taskI: 0})} : null}
                >
                    <div className="group-title"><p>{column.columnDay}</p></div>
                    <NewTaskInputField 
                        columnDate={props.columnDate[columnI]} 
                        columnIndex={columnI} 
                    />                    {column.tasks.map((task, taskI) => (
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
                    ))}
                </div>
            ))}
        </div>
    )
}

export default DragAndDrop;