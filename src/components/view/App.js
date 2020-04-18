import React, { useEffect, useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Today from './Today';
import NavBar from './NavBar';
import { TaskContext } from '../context/TasksContext';
import DragAndDrop from '../utilities/DragAndDrop';
import Settings from './Settings';
import { currentDate, day1, day15, thisWeek, nextWeek, fortNight } from '../utilities/DaysOfWeek';

function App() {
  const {tasks, dispatch} = useContext(TaskContext)
  const todaysTasksIds = []
  const indexOfTodaysTasks = []
  const startdate = `${day1.getFullYear()}-${('0' + (day1.getMonth() + 1)).slice(-2)}-${('0' + day1.getDate()).slice(-2)}T00:00:00Z`
  const enddate = `${day15.getFullYear()}-${('0' + (day15.getMonth() + 1)).slice(-2)}-${('0' + day15.getDate()).slice(-2)}T00:00:00Z`
  const todaysDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
  const tasksListArray = []
  const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


  useEffect(() => {
      axios.get(`https://timebox-be.herokuapp.com/api/tasks?startdate=${startdate}&enddate=${enddate}`)
          .then(tasksRes => {
            for (let i=0; i<tasksRes.data.length; i++) {
                todaysTasksIds.push(tasksRes.data[i].task_id_pk)
                indexOfTodaysTasks.push(i)
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
                for (let i=0; i<fortNight.length; i++) {
                  tasksListArray.push({
                    columnDate: fortNight[i],
                    columnDay: nameOfDays[i],
                    tasks: []
                  })

                  for (let index = 0; index < tasksRes.data.length; index++) {
                        if (tasksRes.data[index].task_due_at.split('T')[0] === `${fortNight[i].getFullYear()}-${('0' + (fortNight[i].getMonth() + 1)).slice(-2)}-${('0' + fortNight[i].getDate()).slice(-2)}`) {
                            tasksListArray[i].tasks.push(tasksRes.data[index]
                            )
                        }
                    }
                }

                dispatch({
                  type: 'GET_TASKS_REQUEST',
                  payload: tasksListArray
                })
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
  }, [])


  return (
    <div className="app_container">
      <NavBar />
      <Switch>
        <Route exact path="/" component={() => <Today indexOfTodaysTasks={indexOfTodaysTasks} />} />
        <Route path="/thisweek" component={() => <DragAndDrop tasks={tasks} columnDate={thisWeek} />} />
        <Route path="/nextweek" component={() => <DragAndDrop tasks={tasks} columnDate={nextWeek} />} />
        <Route path="/settings" component={Settings} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

function Page404() {
  return (
    <div>{"404 not found"}</div>
  )
}

export default App;
