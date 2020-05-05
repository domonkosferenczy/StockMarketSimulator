import React from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import Dashboard from './Dashboard';
import '../stylesheet/App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="AppRightSection" id="appright">
        <Graph />
        <Dashboard />
      </div>
    </div>
  )
}

export default App;
