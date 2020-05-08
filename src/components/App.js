import React from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import Dashboard from './Dashboard';
import '../stylesheet/App.css';
import {Store} from './Store';

function App() {

  return (
    <Store>
      <div className="App">
        <Sidebar />
        <div className="AppRightSection" id="appright">
          <Graph />
          <Dashboard />
        </div>
      </div>
    </Store>
  )
}



export default App;
