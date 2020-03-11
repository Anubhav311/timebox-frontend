import React, { useEffect, useContext } from 'react';
import axios from 'axios';

import Today from './view/Today';
import Tabs from './view/Tabs';
import Week from './view/Week';
import { thisWeek, nextWeek } from './DaysOfWeek';
import { TaskContext } from './context/TasksContext';
import { day1, day15 } from '../components/DaysOfWeek';
import { currentDate } from './DaysOfWeek.js'
import DragAndDrop from './DragAndDrop';

function App() {
  const {tasks, dispatch} = useContext(TaskContext)
  const todaysTasksIds = []
  const indexOfTodaysTasks = []
  const startdate = `${day1.getFullYear()}-${('0' + (day1.getMonth() + 1)).slice(-2)}-${('0' + day1.getDate()).slice(-2)}T00:00:00Z`
  const enddate = `${day15.getFullYear()}-${('0' + (day15.getMonth() + 1)).slice(-2)}-${('0' + day15.getDate()).slice(-2)}T00:00:00Z`
  const todaysDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
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


  useEffect(() => {
      axios.get(`https://timebox-be.herokuapp.com/api/tasks?startdate=${startdate}&enddate=${enddate}`)
          .then(tasksRes => {
            console.log(tasksRes.data[0].task_due_at.split(':'))
            for (let i=0; i<tasksRes.data.length; i++) {
              if (tasksRes.data[i].task_due_at.split('T')[0] === todaysDate) {
                todaysTasksIds.push(tasksRes.data[i].task_id_pk)
                indexOfTodaysTasks.push(i)
              }
            }

            const stringifiedTodaysTasksIds = JSON.stringify(todaysTasksIds) // converting an array into a string

            axios.get(`https://timebox-be.herokuapp.com/api/subtasks?tasksIds=${stringifiedTodaysTasksIds}`)
              .then(subtasks => {

                for (let i = 0; i < indexOfTodaysTasks.length; i++) {
                  let tempSubtasksArray = []
                  for (let j = 0; j < subtasks.data.length; j++) {
                    if (subtasks.data[j].task_id_fk === tasksRes.data[indexOfTodaysTasks[i]].task_id_pk) {
                      tempSubtasksArray.push(subtasks.data[j])
                    }
                  }
                  tasksRes.data[indexOfTodaysTasks[i]].subtasks = [...tempSubtasksArray]
                }

                dispatch({
                  type: 'GET_TASKS_REQUEST',
                  payload: tasksRes.data
                })
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
  }, [])

  return (<>
    <Tabs>
      <div label="today">
        <Today indexOfTodaysTasks={indexOfTodaysTasks} />
      </div>
      <div label="this week">
        <Week 
          tasks={tasks} 
          columnDate={thisWeek} 
        />
      </div>
      <div label="next week">
        <Week 
          tasks={tasks} 
          columnDate={nextWeek}
        />
      </div>
    </Tabs>
    <DragAndDrop data={data}/>
    </>
  );
}

export default App;
