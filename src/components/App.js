import React from 'react';

import Home from './Home';
import TaskContextProvider from './context/TasksContext';

function App() {
  return (
    <div className="">
      <TaskContextProvider>
        <Home/>
      </TaskContextProvider>
    </div>
  );
}

export default App;
