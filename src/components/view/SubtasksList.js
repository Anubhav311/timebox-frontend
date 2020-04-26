import React, { useEffect, useContext, useState } from 'react';

import { TaskContext } from '../context/TasksContext';
import Subtask from './Subtask';
import NewSubtaskInputField from './NewSubtaskInputField';
import '../../styles/SubtaskList.css';

function SubtasksList(props) {
    const {tasks, dispatch} = useContext(TaskContext)
    const [addSubtask, setAddSubtask] = useState(false)

    function AddSubtaskToggle() {
        setAddSubtask(!addSubtask)
    }

    const relevantTask = tasks[props.columnIndex].tasks.filter(task => task.task_id_pk === props.taskIdPk)
    let list = []

    if (relevantTask[0].subtasks) {
        list = relevantTask[0].subtasks.map((subtask, key) => (
            <Subtask 
                key={key}
                text={subtask.subtask} 
                subtaskIndex={key}
                subtaskIdPk={tasks[props.columnIndex].tasks[props.taskIndex].subtasks[key].subtask_id_pk} 
                taskIdPk={props.taskIdPk} 
                taskIndex={props.taskIndex} 
                columnIndex={props.columnIndex}
            />
        ))
    }

    list.push(
        <div key={list.length}>
            {addSubtask 
                ? 
            <NewSubtaskInputField 
                columnDate={props.columnDate} 
                addSubtask={addSubtask} 
                AddSubtaskToggle={AddSubtaskToggle} 
                taskIdPk={props.taskIdPk}
                taskIndex={props.taskIndex}
                columnIndex={props.columnIndex}
            /> 
                : 
            <button className="add_subtask_button" onClick={AddSubtaskToggle}> + </button>}
        </div>
    )


    return (
        <div>
            {list}
        </div>
    )
}

export default SubtasksList;