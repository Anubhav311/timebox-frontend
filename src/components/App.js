import React, { useEffect, useContext } from 'react';
import axios from 'axios';

import Today from './Today';
import Tabs from './Tabs';
import Week from './Week';
import { thisWeek, nextWeek } from './DaysOfWeek';
import { TaskContext } from './context/TasksContext';
import { day1, day15 } from '../components/DaysOfWeek';

function App() {
  const {tasks, dispatch} = useContext(TaskContext)

  useEffect(() => {
      axios.get(`https://timebox-be.herokuapp.com/api/tasks?startdate=${day1.getFullYear()}-${('0' + (day1.getMonth() + 1)).slice(-2)}-${('0' + day1.getDate()).slice(-2)}T00:00:00Z&enddate=${day15.getFullYear()}-${('0' + (day15.getMonth() + 1)).slice(-2)}-${('0' + day15.getDate()).slice(-2)}T00:00:00Z`)
          .then(tasks => dispatch({
              type: 'GET_TASKS_REQUEST',
              payload: tasks.data
          }))
  }, [])

  return (
    <Tabs>
      <div label="today">
        <Today/>
      </div>
      <div label="this week">
        <Week tasks={tasks} columnDate={thisWeek} />
      </div>
      <div label="next week">
        <Week tasks={tasks} columnDate={nextWeek}/>
      </div>
    </Tabs>
  );
}

export default App;
