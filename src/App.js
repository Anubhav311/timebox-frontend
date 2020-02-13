import React from 'react';

import Home from './components/Home';
import TaskContextProvider from './components/context/TasksContext';

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
